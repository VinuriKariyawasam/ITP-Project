const Job = require('../../models/sm/jobscheduleModel');

// POST /api/staff/sm/assign-job
exports.assignedJob = async (req, res) => {
  const { date ,task, technician } = req.body;
  console.log('Received Request Body:', req.body); // Check req.body contents

  // Perform any necessary validations
  
  try {

      // Validate input data
      if (!task ) {
        console.log('Validation Error: task is required');
          return res.status(400).json({ error: 'task and vehicleNumber are required' });
      }
    // Here you can implement the logic to save the job assignment
    // For example:
    const newJob= new Job({
      date,
      task,
      technician,
    });

    // Save the job assignment to the database (assuming you have a Job model)
    const assignedJob =await newJob.save();

    res.status(201).json({ message: 'Job assigned successfully', job: assignedJob });
  } catch (error) {
    console.error('Error assigning job:', error);
    res.status(500).json({ message: 'Failed to assign job' });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};