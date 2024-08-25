// API Endpoints

// 1. Create a Course
app.post('/api/courses', async (req, res) => {
    const { name, description, price, discountPrice, courseType, courseAudience, FAQ, courseOutcomes, lecturerId } = req.body;

    const course = await prisma.course.create({
        data: {
            name,
            description,
            price,
            discountPrice,
            courseType,
            courseAudience,
            FAQ,
            courseOutcomes,
            lecturerId,
        },
    });
    res.status(201).json(course);
});


// 2. Get All Courses
app.get('/api/courses', async (req, res) => {
    const courses = await prisma.course.findMany({
        include: {
            lecturer: true,  // Include lecturer details if needed
            lessons: true,    // Include lessons if needed
        },
    });
    res.status(200).json(courses);
});


// 3. Get a Course by ID
app.get('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
        where: { id: Number(id) },
        include: {
            lessons: true,
            courseComments: true,
            courseMaterials: true,
            lecturer: true,
        },
    });

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
});


// 4. Update a Course
app.put('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, discountPrice, courseType, courseAudience, FAQ, courseOutcomes, lecturerId } = req.body;

    const updatedCourse = await prisma.course.update({
        where: { id: Number(id) },
        data: {
            name,
            description,
            price,
            discountPrice,
            courseType,
            courseAudience,
            FAQ,
            courseOutcomes,
            lecturerId,
        },
    });
    res.status(200).json(updatedCourse);
});


// 5. Delete a Course
app.delete('/api/courses/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.course.delete({
        where: { id: Number(id) },
    });
    res.status(204).send();
});


// Book API Endpoints
// 1. Create a Book
app.post('/api/books', async (req, res) => {
    const { title, author, description, price, discountPrice, bookType } = req.body;

    const book = await prisma.book.create({
        data: {
            title,
            author,
            description,
            price,
            discountPrice,
            bookType,
        },
    });
    res.status(201).json(book);
});

// 2. Get All Books
app.get('/api/books', async (req, res) => {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
});

// 3. Get a Book by ID
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
        where: { id: Number(id) },
        include: {
            bookComments: true,
            payments: true,
        },
    });

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
});


// 4. Update a Book
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price, discountPrice, bookType } = req.body;

    const updatedBook = await prisma.book.update({
        where: { id: Number(id) },
        data: {
            title,
            author,
            description,
            price,
            discountPrice,
            bookType,
        },
    });
    res.status(200).json(updatedBook);
});

// 5. Delete a Book
app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.book.delete({
        where: { id: Number(id) },
    });
    res.status(204).send();
});

// These endpoints provide the ability to create, read, update, and delete lessons associated with your courses. As with the previous APIs, ensure that you handle errors properly and validate the incoming data for security and integrity.
// Lesson API Endpoints
// 1. Create a Lesson
app.post('/api/lessons', async (req, res) => {
    const { courseId, videoId, title, duration, isCompleted, lecturerId } = req.body;

    const lesson = await prisma.lesson.create({
        data: {
            courseId,
            videoId,
            title,
            duration,
            isCompleted,
            lecturerId,
        },
    });
    res.status(201).json(lesson);
});

// 2. Get All Lessons
app.get('/api/lessons', async (req, res) => {
    const lessons = await prisma.lesson.findMany({
        include: {
            course: true,     // Include course details if needed
            lecturer: true,   // Include lecturer details if needed
        },
    });
    res.status(200).json(lessons);
});

// 3. Get a Lesson by ID
app.get('/api/lessons/:id', async (req, res) => {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
        where: { id: Number(id) },
        include: {
            course: true,
            lecturer: true,
            lessonComments: true,
            lessonActivities: true,
        },
    });

    if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson);
});

// 4. Update a Lesson
app.put('/api/lessons/:id', async (req, res) => {
    const { id } = req.params;
    const { courseId, videoId, title, duration, isCompleted, lecturerId } = req.body;

    const updatedLesson = await prisma.lesson.update({
        where: { id: Number(id) },
        data: {
            courseId,
            videoId,
            title,
            duration,
            isCompleted,
            lecturerId,
        },
    });
    res.status(200).json(updatedLesson);
});

// 5. Delete a Lesson
app.delete('/api/lessons/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.lesson.delete({
        where: { id: Number(id) },
    });
    res.status(204).send();
});



// Course Comment API Endpoints
// 1. Create a Course Comment
app.post('/api/course-comments', async (req, res) => {
    const { courseId, userId, comment } = req.body;

    const courseComment = await prisma.courseComment.create({
        data: {
            courseId,
            userId,
            comment,
        },
    });
    res.status(201).json(courseComment);
});


// 2. Get All Course Comments
app.get('/api/course-comments/course/:courseId', async (req, res) => {
    const { courseId } = req.params;

    const courseComments = await prisma.courseComment.findMany({
        where: { courseId: Number(courseId) },
        include: {
            user: true,  // Include user details who made the comment
        },
    });
    res.status(200).json(courseComments);
});


// 3. Get a Course Comment by ID
app.get('/api/course-comments/:id', async (req, res) => {
    const { id } = req.params;

    const courseComment = await prisma.courseComment.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
        },
    });

    if (!courseComment) {
        return res.status(404).json({ message: 'Course comment not found' });
    }
    res.status(200).json(courseComment);
});


// 4. Update a Course Comment
app.put('/api/course-comments/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const updatedComment = await prisma.courseComment.update({
        where: { id: Number(id) },
        data: {
            comment,
        },
    });
    res.status(200).json(updatedComment);
});


// 5. Delete a Course Comment
app.delete('/api/course-comments/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.courseComment.delete({
        where: { id: Number(id) },
    });
    res.status(204).send();
});


// Lesson Comment API Endpoints - endpoints supports the JSON array for replies, allowing users to manage comments and their corresponding replies effectively. Each reply can be added to the reply field of a lesson comment, and the API maintains the structure of the original lesson comments while enabling interaction through replies.

// 1. Create a Lesson Comment
app.post('/api/lesson-comments', async (req, res) => {
    const { lessonId, userId, comment, reply } = req.body;

    const lessonComment = await prisma.lessonComment.create({
        data: {
            lessonId,
            userId,
            comment,
            reply: reply || [], // Initialize with an empty array if no reply is provided
        },
    });
    res.status(201).json(lessonComment);
});


// 2. Get All Comments for a Specific Lesson
app.get('/api/lesson-comments/lesson/:lessonId', async (req, res) => {
    const { lessonId } = req.params;

    const lessonComments = await prisma.lessonComment.findMany({
        where: { lessonId: Number(lessonId) },
        include: {
            user: true,  // Include user details who made the comment
        },
    });
    res.status(200).json(lessonComments);
});

// 3. Get a Lesson Comment by ID
app.get('/api/lesson-comments/:id', async (req, res) => {
    const { id } = req.params;

    const lessonComment = await prisma.lessonComment.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
        },
    });

    if (!lessonComment) {
        return res.status(404).json({ message: 'Lesson comment not found' });
    }
    res.status(200).json(lessonComment);
});

// 4. Update a Lesson Comment
app.put('/api/lesson-comments/:id', async (req, res) => {
    const { id } = req.params;
    const { comment, reply } = req.body;

    const updatedComment = await prisma.lessonComment.update({
        where: { id: Number(id) },
        data: {
            comment,
            reply, // Update the reply JSON array
        },
    });
    res.status(200).json(updatedComment);
});

// 5. Delete a Lesson Comment
app.delete('/api/lesson-comments/:id', async (req, res) => {
    const { id } = req.params;

    await prisma.lessonComment.delete({
        where: { id: Number(id) },
    });
    res.status(204).send();
});

// 6. Add a Reply to a Lesson Comment - This endpoint allows you to add a reply to an existing comment by updating the reply field with the new reply.
app.post('/api/lesson-comments/:id/replies', async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;

    const lessonComment = await prisma.lessonComment.findUnique({
        where: { id: Number(id) },
    });

    if (!lessonComment) {
        return res.status(404).json({ message: 'Lesson comment not found' });
    }

    const updatedComment = await prisma.lessonComment.update({
        where: { id: Number(id) },
        data: {
            reply: [...(lessonComment.reply || []), reply], // Append the new reply
        },
    });

    res.status(200).json(updatedComment);
});


// Payment API Endpoints - This endpoint allows you to create a payment record for a course or a book purchase. The API includes the necessary fields to store payment details, such as the payment method, amount, and status. You can also retrieve payment records and update their status as needed.
// Request Body:
// {
//     "courseId": 1,  // Optional
//     "bookId": 2,    // Optional
//     "userId": 3,
//     "transactionId": "TXN123456",
//     "bankAccount": "123-456-789",
//     "paymentMethod": "Mobile-banking"  // or "Bank"
// }

// 1. Create a Payment
router.post('/api/payment', async (req, res) => {
    const { courseId, bookId, userId, transactionId, bankAccount, paymentMethod } = req.body;
    try {
        const payment = await prisma.payment.create({
            data: {
                courseId,
                bookId,
                userId,
                transactionId,
                bankAccount,
                paymentMethod,
            },
        });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: 'Error creating payment' });
    }
});

router.get('/api/allPayments', async (req, res) => {
    try {
        const payments = await prisma.payment.findMany();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
});

// Get Payment by User ID
router.get('/api/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await prisma.payment.findUnique({
            where: { id: parseInt(id) },
        });
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
});

// Update Payment - only admin can update a payment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { courseId, bookId, userId, transactionId, bankAccount, paymentMethod } = req.body;
    try {
        const payment = await prisma.payment.update({
            where: { id: parseInt(id) },
            data: {
                courseId,
                bookId,
                userId,
                transactionId,
                bankAccount,
                paymentMethod,
            },
        });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ error: 'Error updating payment' });
    }
});

// Delete Payment - only admin can delete a payment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.payment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Payment not found' });
    }
});


// Course Enrollment API Endpoints - Update the UI to allow users to enroll in courses and display enrollment details with payment information. The API endpoints should support creating, reading, updating, and deleting course enrollments. You can also include the ability to retrieve all course enrollments and specific enrollments by ID.

// 1. Create Course Enrollment
// POST /api/course-enrollments
app.post('/api/course-enrollments', async (req, res) => {
    const { courseId, userId, paymentId } = req.body;

    try {
        const enrollment = await prisma.courseEnrollment.create({
            data: {
                courseId,
                userId,
                paymentId,
            },
        });
        res.status(201).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating course enrollment.' });
    }
});

// 2. Get All Course Enrollments
// GET /api/course-enrollments
app.get('/api/course-enrollments', async (req, res) => {
    try {
        const enrollments = await prisma.courseEnrollment.findMany({
            include: {
                course: true,
                user: true,
                payment: true, // Include payment information
            },
        });
        res.status(200).json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching course enrollments.' });
    }
});

// 3. Get Specific Course Enrollment
// GET /api/course-enrollments/:id
app.get('/api/course-enrollments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const enrollment = await prisma.courseEnrollment.findUnique({
            where: { id: parseInt(id) },
            include: {
                course: true,
                user: true,
                payment: true, // Include payment information
            },
        });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching course enrollment.' });
    }
});

// 4. Update Course Enrollment
// PUT /api/course-enrollments/:id
app.put('/api/course-enrollments/:id', async (req, res) => {
    const { id } = req.params;
    const { courseId, userId, paymentId, isActive } = req.body;

    try {
        const enrollment = await prisma.courseEnrollment.update({
            where: { id: parseInt(id) },
            data: {
                courseId,
                userId,
                paymentId,
                isActive,
            },
        });
        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating course enrollment.' });
    }
});

// 5. Delete Course Enrollment
// DELETE /api/course-enrollments/:id
app.delete('/api/course-enrollments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.courseEnrollment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting course enrollment.' });
    }
});
