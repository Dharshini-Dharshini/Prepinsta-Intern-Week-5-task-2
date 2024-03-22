const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'studentDatabase';

// Collection Names
const academicCollectionName = 'academicRecords';
const coCurricularCollectionName = 'coCurricularActivities';

// Sample academic records data
const academicRecordsData = [
    { studentID: 1, name: 'John Doe', grades: { math: 'A', science: 'B', history: 'A' }, subjects: ['Math', 'Science', 'History'] },
    { studentID: 2, name: 'Jane Smith', grades: { math: 'B', science: 'A', history: 'A' }, subjects: ['Math', 'Science', 'History'] },
    // Add more sample data as needed
];

// Sample co-curricular activities data
const coCurricularActivitiesData = [
    { studentID: 1, name: 'John Doe', activityType: 'Sports', duration: '2 years', achievements: ['Football Champion 2022'] },
    { studentID: 2, name: 'Jane Smith', activityType: 'Music', duration: '3 years', achievements: ['Piano Recital Winner 2023'] },
    // Add more sample data as needed
];

// Function to initialize MongoDB and perform operations
async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to the MongoDB server');

        // Access the database
        const database = client.db(dbName);

        // Create academic records collection and insert sample data
        const academicCollection = database.collection(academicCollectionName);
        await academicCollection.insertMany(academicRecordsData);
        console.log('Sample academic records inserted successfully');

        // Create co-curricular activities collection and insert sample data
        const coCurricularCollection = database.collection(coCurricularCollectionName);
        await coCurricularCollection.insertMany(coCurricularActivitiesData);
        console.log('Sample co-curricular activities inserted successfully');

        // Example: Read data from academic records collection
        const academicRecords = await academicCollection.find({}).toArray();
        console.log('Academic Records:');
        console.log(academicRecords);

        // Example: Read data from co-curricular activities collection
        const coCurricularActivities = await coCurricularCollection.find({}).toArray();
        console.log('Co-curricular Activities:');
        console.log(coCurricularActivities);

        // Additional CRUD operations can be performed here

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the main function
main();