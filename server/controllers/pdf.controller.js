import PDFDocument from 'pdfkit';
export const pdfDownload = async (req, res) => {
        const {results} = req.body;

        if(!results) {
            return res.status(400).json({error: "Results data is required to generate PDF"});
        }

        const doc = new PDFDocument({margin: 50});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=exam_notes_AI.pdf');
        doc.pipe(res);

        // Title
        doc.fontSize(20).text('Exam Notes AI', {align: 'center'});
        doc.moveDown();
        doc.fontSize(14).text(`Importance: ${results.importance}`);
        doc.moveDown();

        // Sub Topics
        doc.fontSize(16).text('Sub Topics:');
        doc.moveDown(0.5);
        Object.entries(results.subTopics).forEach(([star, topics]) => {
            doc.moveDown(0.5);
            doc.fontSize(14).text(`${star} Topics:`);   
             
            topics.forEach((t)=>{
                doc.fontSize(12).text(`• ${t}`);
            });
        });

        doc.moveDown();

        //Notes
        doc.fontSize(16).text('Detailed Notes:');
        doc.moveDown(0.5);
        doc.fontSize(12).text(results.notes.replace(/[#*`]/g, '')); // Remove markdown characters for PDF

        doc.moveDown();

        //Revision Points
        doc.fontSize(16).text('Quick Revision Points:');
        doc.moveDown(0.5);
        results.revisionPoints.forEach((p)=>{
            doc.fontSize(12).text(`• ${p}`);
        });

        doc.moveDown();

        //Questions
        doc.fontSize(16).text('Important Questions:');
        doc.moveDown(0.5);

        doc.fontSize(13).text('Short Questions:');
        results.questions.short.forEach((q)=>{
            doc.fontSize(12).text(`• ${q}`);
        });

        doc.moveDown(0.5);
        doc.fontSize(13).text('Long Questions:');
        results.questions.long.forEach((q)=>{
            doc.fontSize(12).text(`• ${q}`);
        });

        doc.moveDown(0.5);
        doc.fontSize(13).text('Diagrams:');
        doc.fontSize(12).text(results.questions.diagrams);

        doc.end();
        


}