const Categories = ({ categoryId, setCategoryId }) => {
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
            {categories.map((categoryName, index) => (
               <li
                  key={index}
                  onClick={() => setCategoryId(index)}
                  className={categoryId == index ? 'active' : ''}>
                  {categoryName}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Categories;
