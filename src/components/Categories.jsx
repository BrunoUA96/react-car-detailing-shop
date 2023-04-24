import { useState } from 'react';

const Categories = () => {
   const [activeIndex, setActiveIndex] = useState(0);

   const categories = [
      'All products',
      'Exterior',
      'Interior',
      'Tools & Accessories',
      'Popular kits & Collections',
   ];

   return (
      <div className="categories">
         <ul>
            {categories.map((category, index) => (
               <li
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={activeIndex == index ? 'active' : ''}>
                  {category}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Categories;
