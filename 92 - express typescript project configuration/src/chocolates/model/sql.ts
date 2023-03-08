const SELECT = `SELECT 
c.id, 
c.title, 
c.brand, 
i.cocoa, 
i.sugar, 
c.price, 
c.rating, 
IF(COUNT(img.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(img.src)) as images
    FROM chocoImages as img
    LEFT JOIN chocolates as c
    ON img.chocoId = c.id
    LEFT JOIN  ingredients as i
    ON c.ingredientId = i.id`;

const GROUP = 'GROUP BY c.id;';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
