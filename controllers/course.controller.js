const getCourseDetails = (request, response) => {
    let courseId = request.params.courseId;
    data = {
        studentId: "219110037",
        numRegisteredStudents: 10,
        numPassedStudents: 5,
        activities: [
            { name: "Quiz 1", weight: 5 },
            { name: "Quiz 2", weight: 5 },
            { name: "Major 1", weight: 20 },
            { name: "Major 2", weight: 20 },
            { name: "Homeworks", weight: 5 },
            { name: "Attendance", weight: 5 },
            { name: "Final", weight: 40 }
        ],
        gradeDistribution: [
            { grade: "A", count: 1 },
            { grade: "B", count: 1 },
            { grade: "C", count: 2 },
            { grade: "D", count: 1 },
            { grade: "F", count: 5 },
        ],
        testimonials: [
            { studentId: "219110250", major: "Information Systems", feedback: "I sucked at this course" },
            { studentId: "219110250", major: "Information Systems", feedback: "I sucked at this course" }
        ]
    }
    return response.render("course/course-details", { data: data })
}

module.exports = { getCourseDetails }