    export default async function handlerequest (req,res) {

    if(req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

     const { address } = req.body;

     if(!address) {
      return res.status(400).json({ error: 'Address is required' })
     }
    
     const apiKey = process.env.GEMINI_API_KEY;

     if(!apiKey) {
      return res.status(500).json({ error: 'API key is missing on the server' });
     }  

     const prompt = `write me about this location : ${address} tell me update about the location the good news recently the bad news recently the king nearby police station near by hospital `

    return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  }).then((response) => { return response.json().then((data) => {
         const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No details available for this location.";
         
         return res.status(200).json({ result: aiText });
     }).catch((error) => {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "Failed to connect to Gemini." });
  });

     })


   }

  
