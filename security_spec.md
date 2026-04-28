# Security Specification - CyberShield Academy

## Data Invariants
1. A **User** document must have a `userId` matching their `request.auth.uid`.
2. **Roles** (admin/teacher/student) are immutable once set by the system, except by an admin.
3. **Courses** can only be created/edited by users with the `teacher` or `admin` role.
4. **Submissions** must always belong to the `request.auth.uid` of the student creating it.
5. **Progress** records are private to the student and viewing teachers.
6. **IDs** must match `^[a-zA-Z0-9_\-]+$`.

## The Dirty Dozen (Attack Scenarios)
1. **Identity Spoofing**: User A tries to create a user document with User B's ID.
2. **Privilege Escalation**: Student tries to update their role to 'admin'.
3. **Course Vandalism**: Student tries to delete or modify a course created by a teacher.
4. **Submission Forgery**: User A tries to submit work on behalf of User B.
5. **Grade Tampering**: Student tries to update the `grade` field on their own submission.
6. **Ghost Fields**: User tries to add `isVerified: true` to their user profile.
7. **Resource Poisoning**: User tries to inject 1MB of junk data into a course title.
8. **Orphaned Write**: Submitting to a course that doesn't exist.
9. **Relational Bypass**: Student reading another student's private progress document.
10. **Terminal State Break**: Student trying to resubmit after a submission is marked as 'graded'.
11. **Timestamp Spoofing**: Client providing a `createdAt` date in the past.
12. **Query Scraping**: Authenticated user trying to list ALL users via `isSignedIn()` blanket read.

## Test Runner Logic
The `firestore.rules` will be validated against these scenarios to ensure `PERMISSION_DENIED` is returned.
