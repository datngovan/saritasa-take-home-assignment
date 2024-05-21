const booksList = [
  {
    PublicationYear: "1900",

    Name: "12321dat",

    rating: 0,

    Author: "123123",

    id: "iQl3cRnbQjwjpgVELxJH",
  },

  {
    Name: "3213123213dasd",

    Author: "123123",

    rating: 0,

    PublicationYear: "1900",

    id: "kfB2fHgNU68ArvoJxSyl",
  },

  {
    Author: "12312",

    Name: "321321dasd",

    rating: 0,

    PublicationYear: "1900",

    id: "82qZ5M4T92Vrw3K6HmOt",
  },

  {
    rating: 0,

    PublicationYear: "1900",

    Name: "321321dasd21321",

    Author: "12313",

    id: "Fdj3oHU9wbXRA6VBmvbC",
  },

  {
    PublicationYear: "1900",

    Name: "321321dasd21321",

    rating: 0,

    Author: "12313",

    id: "UJCJYq7ugRMlr5KGWYPG",
  },

  {
    Author: "12313",

    PublicationYear: "1900",

    rating: 0,

    Name: "321321dasd21321",

    id: "hlvAHl8M2wECrIFyEnNI",
  },

  {
    Name: "new book",

    PublicationYear: "2001",

    rating: 0,

    Author: "ádassa",

    id: "DJu0gfbgT5QSF5MsAq7C",
  },

  {
    PublicationYear: "2001",

    rating: 0,

    Author: "ádassa",

    Name: "new book",

    id: "HwiYNXPTS4ogKIWOvqbe",
  },

  {
    PublicationYear: "2001",

    Author: "ádassa",

    Name: "new book",

    rating: 0,

    id: "QWqWBd4uZefRRuyTQg9s",
  },

  {
    Author: "ádassa",

    PublicationYear: "2001",

    rating: 0,

    Name: "new book",

    id: "g4JRpFgTL8HRziLIyZm0",
  },

  {
    rating: 0,

    Author: "ádassa",

    PublicationYear: "2001",

    Name: "new book",

    id: "p8XUQFyUlnBXHoHv052H",
  },

  {
    Author: "ádassa",

    rating: 0,

    Name: "new book",

    PublicationYear: "2001",

    id: "tTLi3TpjlwriHiHfIeir",
  },

  {
    PublicationYear: "2001",

    Name: "new book 2012312",

    Author: "ádassa",

    ISBN: "12",

    rating: 0,

    id: "GojDwH2tYYqLXolNehNU",
  },

  {
    Name: "new book2",

    Author: "ádassa",

    PublicationYear: "2001",

    rating: 0,

    id: "87sxxhSnJGjEghV5Cc5P",
  },

  {
    Author: "ádassa",

    PublicationYear: "2001",

    Name: "new book2",

    rating: 0,

    id: "FWcv6NJ9FUO4q9yYaAHG",
  },

  {
    Name: "Press Reset: Ruin and Recovery in the Video Game Industry",

    Author: "12312dá",

    PublicationYear: "1900",

    rating: 0,

    id: "Nqm39zAbl52jzFuiMj8A",
  },

  {
    PublicationYear: "1980",

    ISBN: "12",

    Name: "Press Reset: Ruin and Recovery in the Video Game Industry",

    rating: 0,

    Author: "123ads",

    id: "VOyb57ttws3m0CUVawSu",
  },

  {
    Author: "ádassa",

    rating: 0,

    PublicationYear: "2001",

    ISBN: "12",

    Name: "Press Reset: Ruin and Recovery in the Video Game Industry 12312312312",

    id: "iZSgd6MblmJQskTfdFzS",
  },

  {
    ISBN: "12",

    Name: "Press Reset: Ruin and Recovery in the Video Game Industry 12312312312",

    Author: "ádassa",

    PublicationYear: "2001",

    rating: 0,

    id: "tXy1aCuB7PyeGR17zOQ7",
  },
];
// grouping the bookLists into array group by year then sort the year value
export async function groupByYear(booksList) {
  console.log("data::", booksList);
  const result = Object.groupBy(booksList, ({ ...Author }) => Author.name);
  return result;
}
