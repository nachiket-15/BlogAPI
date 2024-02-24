import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 4,
    title: "The Future of Remote Work: Adapting to a Virtual Workspace",
    content:
      "Remote work has become a defining trend in the modern workforce, accelerated by technological advancements and global events. As companies embrace distributed teams, it's essential to understand the challenges and opportunities of remote work. From digital collaboration tools to flexible work arrangements, this article explores the evolution of remote work and strategies for creating a productive virtual workspace.",
    author: "Emily Rodriguez",
    date: "2023-09-02T11:45:00Z",
  },
  {
    id: 5,
    title: "Exploring the Metaverse: The Next Frontier in Digital Interaction",
    content:
      "The concept of the metaverse has captured the imagination of technologists and futurists alike, promising a virtual universe where users can interact, create, and explore. From virtual reality environments to blockchain-based economies, the metaverse represents a paradigm shift in how we engage with digital content. This article delves into the potential applications of the metaverse and its implications for entertainment, commerce, and social interaction.",
    author: "Daniel Lee",
    date: "2023-09-15T13:20:00Z",
  },
  {
    id: 6,
    title: "The Power of Blockchain: Transforming Industries Through Decentralization",
    content:
      "Blockchain technology is reshaping industries by decentralizing processes and enabling trustless transactions. From finance and supply chain management to healthcare and voting systems, blockchain has the potential to revolutionize various sectors. This article explores real-world use cases of blockchain technology and its impact on fostering transparency, security, and efficiency across different domains.",
    author: "Sophia Chen",
    date: "2023-09-28T10:00:00Z",
  },
  {
    id: 7,
    title: "The Evolution of E-Commerce: Navigating Trends in Online Retail",
    content:
      "E-commerce continues to evolve, driven by changing consumer behaviors and technological innovations. From mobile shopping and social commerce to augmented reality experiences, online retail is undergoing a transformation. This article examines emerging trends in e-commerce and provides insights for businesses looking to adapt and thrive in the digital marketplace.",
    author: "Michael Brown",
    date: "2023-10-10T15:30:00Z",
  },
  {
    id: 8,
    title: "The Psychology of Productivity: Understanding Motivation and Performance",
    content:
      "Productivity is a multifaceted concept influenced by various psychological factors. Understanding the psychology behind motivation, focus, and goal-setting is essential for enhancing performance in both personal and professional settings. This article explores key principles of productivity psychology and offers practical strategies for improving efficiency and achieving long-term success.",
    author: "Rachel Taylor",
    date: "2023-10-25T09:45:00Z",
  },
];

let lastId = 8;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts",(req,res)=>{
  console.log(posts);
  res.json(posts);
});



// :))
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const searchIdx = posts.findIndex((post) => post.id === id);

  // If the post with the specified ID is not found, return a 404 response
  if (searchIdx === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Retrieve the post using the index found
  const responsePost = posts[searchIdx];

  // Send the retrieved post as a JSON response
  res.json(responsePost);
});


// :))
//CHALLENGE 3: POST a new post
app.post("/posts",(req,res)=>{
  const newId=lastId+1;

  const newPost={
    id:newId,
    title:req.body.title,
    content:req.body.content,
    author:req.body.author,
    date:new Date(),
  };
  lastId=newId;
  posts.push(newPost);
  res.status(201).json(newPost);
});


// :))
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);

  const existingPost=posts.find((post)=>post.id===id);

  const replacementPost={
    id:id,
    title:req.body.title || existingPost.title,
    content:req.body.content || existingPost.content,
    author:req.body.author || existingPost.author,
    date: new Date(),
  };

  const searchIdx=posts.findIndex((post)=>post.id===id);
  post[searchIdx]=replacementPost;

  console.log(posts[searchIdx]);
  res.status(201).json(replacementPost);

});


//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) => {
  const id=parseInt(req.params.id);

  const index = posts.findIndex((post) => post.id ===id );

  if (index === -1){
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});








app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
