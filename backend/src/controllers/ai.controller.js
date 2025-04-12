
const aiService = require('../services/ai.service');

const  getReview = async (req, res) => {

    try{
        const code = req.body.code;
        if (!code) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await aiService(code);
         if (!response) {
            return res.status(500).json({ error: 'Failed to generate response' });
        }
        return res.status(200).json({ response });
    }catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};


module.exports = {
    getReview
};

