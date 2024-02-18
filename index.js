document.addEventListener('DOMContentLoaded', function () {
    const addCourseBtn = document.getElementById('addCourse');
    const calculateCGPABtn = document.getElementById('calculateCGPA');
    const resetCalculatorBtn = document.getElementById('resetCalculator');
    const coursesTable = document.getElementById('coursesTable');
    const cgpaResult = document.getElementById('cgpaResult');

    const courses = [];

    addCourseBtn.addEventListener('click', function () {
        const courseCode = document.getElementById('courseCode').value.toUpperCase();
        const units = parseInt(document.getElementById('units').value);
        const grade = document.getElementById('grade').value;

        if (courseCode && units && grade) {
            courses.push({ courseCode, units, grade });

            const row = coursesTable.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = courseCode;
            cell2.textContent = units;
            cell3.textContent = grade;

            document.getElementById('courseCode').value = '';
            document.getElementById('units').value = '';
            document.getElementById('grade').value = '';
        }
    });

    calculateCGPABtn.addEventListener('click', function () {
        let totalGradePoints = 0;
        let totalUnits = 0;

        for (const course of courses) {
            const gradePoint = getGradePoint(course.grade);
            totalGradePoints += gradePoint * course.units;
            totalUnits += course.units;
        }

        if (totalUnits === 0) {
            cgpaResult.textContent = 'Please add courses to calculate CGPA.';
        } else {
            const cgpa = totalGradePoints / totalUnits;
            cgpaResult.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
        }
    });

    resetCalculatorBtn.addEventListener('click', function () {
        courses.length = 0;
        while (coursesTable.rows.length > 1) {
            coursesTable.deleteRow(1);
        }
        cgpaResult.textContent = '';
    });

    function getGradePoint(grade) {
        switch (grade.toUpperCase()) {
            case 'A':
                return 5.0;
            case 'B':
                return 4.0;
            case 'C':
                return 3.0;
            case 'D':
                return 2.0;
            case 'E':
                return 1.0;
            case 'F':
                return 0.0;
            default:
                return 0.0;
        }
    }
});
