import React, { useState } from 'react';
import { AiFillHeart, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { MdDelete, MdEdit } from 'react-icons/md';
import img1 from "../../Assets/1.png";
import img2 from "../../Assets/10.png";

const Post = () => {
  const [likes, setLikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + (likeClicked ? -1 : 1));
    setLikeClicked(!likeClicked);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const comment = {
        text: newComment,
        timestamp: new Date().toLocaleTimeString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    setEditIndex(-1);
  };

  const handleEditComment = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
    setEditIndex(-1);
  };

  return (
    <div className="bg-white py-8 max-w-3xl mx-auto rounded-lg shadow-xl overflow-hidden mb-6 p-4  border">
      <div className="flex items-center mb-4">
        <img src={img2} alt="Profile" className="w-20 h-20 sm:w-20 sm:h-20 border-4 border-white dark:border-gray-950 rounded-full" />
        <div>
          <h3 className="font-bold text-lg mx-5">John Doe</h3>
          <p className="text-gray-500 mx-5">Plombier</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        This is a sample post about my latest project. I'm excited to share it with you all!
      </p>
      <img
        alt="Post"
        src={img1}
        className="w-full rounded-lg mb-4"
      />
      
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleLike}
          className={`text-gray-500 hover:text-gray-700 flex items-center ${likeClicked ? 'text-red-500' : ''}`}
        >
          <AiFillHeart className="h-6 w-6 mr-1" />
          {likes}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <AiOutlineComment className="h-6 w-6 mr-1 mx-2" />
          Comments ({comments.length})
        </button>
        <button className="text-gray-500 hover:text-gray-700 flex items-center">
          <AiOutlineShareAlt className="h-6 w-6 mr-1 mx-2" />
          Share
        </button>
        <p className="text-gray-500 text-sm">
          <AiOutlineClockCircle className="h-4 w-4 inline mr-1 mx-2" />
          2 hours ago
        </p>
      </div>
      {showComments && (
        <div className="mt-4">
          <div className="flex w-full">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 mx-5"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div className="text-gray-800">
                  <p className="text-sm">{comment.text}</p>
                  <p className="text-xs text-gray-500">{comment.timestamp}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditIndex(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  );
};

export default Post;
