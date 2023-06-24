const MODEL_ID = 'face-detection';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = process.env.PAT;
  const USER_ID = process.env.USER_ID;
  const APP_ID =  process.env.APP_ID;
  
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID,
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Key ${PAT}`,
    },
    body: raw,
  };

  return requestOptions;
};

const handleApiCall = (req, res) => {
  const { imageUrl } = req.body;
  const fetchOptions = returnClarifaiRequestOptions(imageUrl);
  fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, fetchOptions)
    .then(response => response.json())
    res.setHeader('Access-Control-Allow-Origin', 'https://smart-brain-3eok.onrender.com');
    .then(data => { 
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
};

const handleImage = (req, res, db) =>{
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('Problem getting entries'))  
}

export { 
  handleImage,
  handleApiCall
};