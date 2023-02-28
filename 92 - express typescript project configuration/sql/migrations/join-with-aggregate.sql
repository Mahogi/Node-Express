SELECT h.id, h.title, l.country, l.city, h.price, h.rating, JSON_ARRAYAGG(i.src)
FROM images as i
LEFT JOIN houses as h
ON i.houseId = h.id
LEFT JOIN  locations as l
ON h.locationId = l.id
GROUP BY h.id;

SELECT c.id, c.title, c.brand, i.cocoa, i.sugar, c.price, c.rating, JSON_ARRAYAGG(img.src)
FROM chocoImages as img
LEFT JOIN chocolates as c
ON img.chocoId = c.id
LEFT JOIN  ingredients as i
ON c.ingredientId = i.id
GROUP BY c.id;