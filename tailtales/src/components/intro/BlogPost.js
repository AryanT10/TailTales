import React from 'react';
import blog1 from "../../images/blog1.jpg";
import blog2 from "../../images/blog2.jpg";
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../main/Footer';
import '../../styles/intro/BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = parseInt(id);
  
  // This would typically come from an API or CMS
  const blogPosts = {
    "1": {
      title: "My Pet is the Best",
      author: "Emma Wilson",
      date: "February 12, 2025",
      image: blog1,
      content: [
        "Regular dog walks provide essential exercise and mental stimulation for your canine companion. Just like humans, dogs need physical activity to maintain a healthy weight, keep their joints flexible, and build strong muscles. But the benefits go far beyond physical health.",
        "When your dog explores the neighborhood during walks, they're engaging all their senses - sniffing new scents, seeing different environments, and hearing various sounds. This sensory stimulation is crucial for their cognitive health and helps prevent boredom-related behavioral issues like excessive barking, chewing, and digging.",
        "Walking also provides valuable socialization opportunities. Dogs that regularly interact with other dogs and people tend to develop better social skills and are less likely to exhibit fear or aggression in new situations. These encounters help your pet build confidence and adaptability.",
        "Beyond the physical and mental benefits for your dog, regular walks strengthen the bond between you and your pet. This shared activity creates positive associations and builds trust, enhancing your relationship.",
        "For optimal benefits, aim for at least 30 minutes of walking daily, though this may vary based on your dog's breed, age, and health status. High-energy breeds like Border Collies or Labrador Retrievers might need up to 2 hours of exercise daily, while smaller or older dogs might be satisfied with shorter, gentler walks.",
        "Remember to keep walks interesting by occasionally changing your route or exploring new parks. Interactive elements like fetch games or simple training exercises during walks can provide additional mental stimulation.",
        "In conclusion, regular walks are one of the best gifts you can give your canine companion - they promote physical health, provide mental stimulation, offer socialization opportunities, and strengthen your bond. So grab that leash and hit the trails - your dog will thank you for it!"
      ],
      tags: ["Dogs", "Exercise", "Pet Health"]
    },
    "2": {
      title: "Fun Activities for Your Pet",
      author: "Alex Thompson",
      date: "March 8, 2025",
      image: blog2,
      content: [
        "Enhance your pet walks with interactive activities that stimulate both mind and body. From simple games of fetch to hide-and-seek with treats, there are countless ways to make outdoor time more engaging for your pet.",
        "Many pets enjoy training sessions incorporated into their playtime. Try teaching new tricks during your walks or play sessions - it's a wonderful way to provide mental challenges while strengthening your bond.",
        "For water-loving dogs, swimming provides excellent exercise with minimal impact on joints. Whether at a pet-friendly beach, lake, or pool, supervised swimming sessions can be the highlight of your pet's week.",
        "Indoor activities are equally important, especially during extreme weather conditions. Puzzle toys, obstacle courses made from household items, and scent games can keep your pet mentally stimulated without leaving home.",
        "Finally, don't underestimate the value of simple companionship. Sometimes the best activity is just spending quiet time together, reinforcing the special connection you share with your furry friend."
      ],
      tags: ["Pet Activities", "Play", "Exercise"]
    }
  };
  
  // Get the max post ID for navigation boundaries
  const maxPostId = Object.keys(blogPosts).length;
  
  // Get the blog post data based on the ID parameter
  const post = blogPosts[id];
  
  // Handle case where blog post doesn't exist
  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-content">
          <h1>Blog Post Not Found</h1>
          <p>Sorry, the blog post you're looking for doesn't exist.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle navigation between posts
  const goToPreviousPost = () => {
    navigate(`/blog/${currentId - 1}`);
  };

  const goToNextPost = () => {
    navigate(`/blog/${currentId + 1}`);
  };

  return (
    <>
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="blog-post-header">
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span className="author">By {post.author}</span>
              <span className="date">{post.date}</span>
            </div>
            <div className="blog-post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="blog-post-image-container">
            <img src={post.image} alt={post.title} className="blog-post-image" />
          </div>
          
          <div className="blog-post-content">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="blog-post-actions">
            {currentId > 1 && (
              <button 
                className="navigation-button prev"
                onClick={goToPreviousPost}
              >
                Previous Post
              </button>
            )}
            
            <button 
              className="back-button"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
            
            {currentId < maxPostId && (
              <button 
                className="navigation-button next"
                onClick={goToNextPost}
              >
                Next Post 
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}