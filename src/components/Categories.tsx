import React from "react";

export const categoryList = [
  "All products",
  "Exterior",
  "Interior",
  "Tools & Accessories",
  "Popular kits & Collections",
];

type CategoryProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const Categories: React.FC<CategoryProps> = React.memo(
  ({ categoryId, setCategoryId }) => {
    return (
      <div className="categories">
        <ul>
          {categoryList.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => setCategoryId(index)}
              className={categoryId == index ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
