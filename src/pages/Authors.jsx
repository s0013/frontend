import React, { useState } from 'react';
import AuthorCard from './AuthorCard';
import AuthorModal from './AuthorModal';

const Authors = () => {
  // Sample author data (you can replace this with your actual data)
  const authors = [
    {
      id: 1,
      name: 'Frank Herbert',
      photoUrl: 'https://m.media-amazon.com/images/M/MV5BM2IwYTM0MWEtYzMxYi00YTI1LTlkYWQtZmE5ZGM0NGI2NmYyXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
      info: `Notable Works: "Dune" series (1965 onwards) - a seminal work in science fiction exploring themes of politics, religion, and ecology in a desert planet setting.
  Legacy: Herbert's intricate world-building and exploration of complex themes have made "Dune" a landmark in science fiction literature, influencing countless writers and filmmakers.`
    },
    {
      id: 2,
      name: 'Stieg Larsson',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv296Mx22TJB89Cedqowb3D0OrfT_kzlIqvg&s',
      info: `Notable Works: The Millennium series, including "The Girl with the Dragon Tattoo" - crime thrillers known for their gripping plots and strong, complex characters like Lisbeth Salander.`
    },
    {
      id: 3,
      name: 'Bram Stoker',
      photoUrl: 'https://audiolibrosencastellano.com/sites/default/files/styles/480/public/img/bram-stoker.jpg.webp?itok=u6M4AeD-',
      info: `Notable Works: "Dracula" (1897) - a Gothic horror novel that introduced Count Dracula, an iconic vampire character, and set the standard for vampire fiction.`
    },
    {
      id: 4,
      name: 'J.R.R. Tolkien',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Tolkien-color.png',
      info: `Notable Works: "The Hobbit" (1937) and "The Lord of the Rings" trilogy (1954-1955) - epic high fantasy novels set in Middle-earth, featuring rich mythology, languages, and memorable characters like Frodo Baggins and Gandalf.`
    },
    {
      id: 5,
      name: 'Markus Zusak',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Markus_Zusak_2019_%28cropped%29.jpg',
      info: `Notable Works: "The Book Thief" - a novel set in Nazi Germany narrated by Death, which follows a young girl named Liesel Meminger and her experiences during World War II.`
    },
    {
      id: 6,
      name: 'Orson Scott Card',
      photoUrl: 'https://danbrown.com/wp-content/themes/danbrown/images/db/slideshow/author/db.courter.02.jpg',
      info: `Notable Works: "Ender's Game" - a science fiction novel set in a future where gifted children are trained for war against an alien species, exploring themes of war, leadership, and empathy.`
    },
    {
      id: 7,
      name: 'Gillian Flynn',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Gillian_Flynn_2014_%28cropped%29.jpg',
      info: `Notable Works: "Gone Girl" - a psychological thriller that delves into the complexities of marriage and deception, known for its twisty plot and unreliable narrators.`
    },
    {
      id: 8,
      name: 'Nicholas Sparks',
      photoUrl: 'https://m.media-amazon.com/images/M/MV5BMTA3NjQxOTc2ODReQTJeQWpwZ15BbWU3MDMxODY4Njc@._V1_.jpg',
      info: `Notable Works: "The Notebook" - a romance novel that explores the love story of Noah Calhoun and Allie Nelson over several decades, addressing themes of love, loss, and second chances.`
    },
    {
      id: 9,
      name: 'William Gibson',
      photoUrl: 'https://compote.slate.com/images/8218a0de-fbf7-41aa-84c7-c45da84e31d4.jpg',
      info: `Notable Works: "Neuromancer" - a pioneering work of cyberpunk fiction set in a dystopian future, credited with popularizing the genre and introducing concepts like cyberspace and virtual reality.`
    },
    {
      id: 10,
      name: 'Stephen King',
      photoUrl: 'https://cdn.britannica.com/20/217720-050-857D712B/American-novelist-Stephen-King-2004.jpg',
      info: `Notable Works: "The Shining" (1977), "It" (1986), "The Dark Tower" series - horror, supernatural fiction, and suspense novels known for their compelling characters and chilling atmosphere.`
    },
    {
      id: 11,
      name: 'Isaac Asimov',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTigs-12hSI3JREeBZLV0ycwMgZznzs29xfzg&s',
      info: `Notable Works: "Foundation" series, "Robot" series - science fiction novels exploring themes of robotics, artificial intelligence, and the future of humanity.`
    },
    {
      id: 12,
      name: 'Paula Hawkins',
      photoUrl: 'https://media.vanityfair.com/photos/5943ff3ee9423741a1f17778/master/pass/NealStephenson%20ap_credit%20Brady%20Hall.jpg',
      info: `Notable Works: "The Girl on the Train" - a psychological thriller that follows the intertwined lives of three women, known for its suspenseful plot and unreliable narrator.`
    },
    {
      id: 13,
      name: 'Alex Michaelides',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9YnUJ5yr9SgdDSwU_7e_8ULDNP6_ATpznA&s',
      info: `Notable Works: "The Silent Patient" - a psychological thriller about a woman who stops speaking after being accused of murdering her husband, known for its shocking twists and exploration of mental illness.`
    },
    {
      id: 14,
      name: 'Jojo Moyes',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNe5A7koSqatR4pFfDz1dOe_qRcHZgcyPf4A&s',
      info: `Notable Works: "Me Before You" - a romance novel that explores the relationship between a quadriplegic man and his caregiver, addressing themes of love, disability, and autonomy.`
    },
    {
      id: 15,
      name: 'Diana Gabaldon',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lt2HO21CYlaLTAy0fs_H_RvU1unhmFOb0w&s',
      info: `Notable Works: "Outlander" series - a blend of historical fiction, romance, and time travel, following the adventures of Claire Randall in 18th-century Scotland and beyond.`
    },
    {
      id: 16,
      name: 'Jane Austen',
      photoUrl: 'https://i.pinimg.com/736x/45/0e/1e/450e1e1a20baeeadec180ba3f50a464c.jpg',
      info: `Notable Works: "Pride and Prejudice" (1813), "Sense and Sensibility" (1811), "Emma" (1815) - novels known for their wit, social commentary, and exploration of romantic relationships in Regency England.`
    }
  ];
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const openModal = (author) => {
    setSelectedAuthor(author);
  };

  const closeModal = () => {
    setSelectedAuthor(null);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center bg-red-600 text-white p-4 font-cursive ">Authors</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 bg-rose-800 p-4 rounded-lg mb-4 ">
        {authors.map((author) => (
          <div key={author.id} className=" p-4 rounded-lg shadow-md">
            <AuthorCard author={author} openModal={openModal} />
          </div>
        ))}
      </div>
      {selectedAuthor && (
        <AuthorModal author={selectedAuthor} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Authors;
