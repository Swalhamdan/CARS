const mongoose = require('mongoose');
const Course = require('./model/course.model.js'); 
const Account = require('./model/account.model.js'); 

const dbUrl = 'mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function createCourse(id, name, participantEmails) {
    try {
        // Fetch accounts based on emails
        const participants = await Account.find({ email: { $in: participantEmails } });

        // Map to their IDs
        const participantIds = participants.map(participant => participant._id);

        // Create and save the course with participant IDs
        const newCourse = new Course({ id, name, participants: participantIds });
        await newCourse.save();

        console.log('Course created successfully:', newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
    } finally {
        mongoose.disconnect();
    }
}

const [id, name, ...emails] = process.argv.slice(2);

if (!id || !name || emails.length === 0) {
    console.log('Usage: node createCourse.js <id> <name> <email1> <email2> ...');
    process.exit(1);
}

createCourse(parseInt(id), name, emails);

/* 
    To run this script and add multiple participants to a course, you would use the following command:
    node createCourse.js 101 "Introduction to Programming" email1@example.com email2@example.com email3@example.com
*/