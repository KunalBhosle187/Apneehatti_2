import moment from "moment";

export const getSumOfArray = (arr, logic, totalSales, sellerStore) => {
  const data1 = arr
    .filter(
      (ord) =>
        ord.orderItems.filter((sub) => sub.store == sellerStore).length > 0
    )
    .map((ord) =>
      totalSales == "totalSales"
        ? ord.orderItems
            .filter(
              (x) =>
                x.store == sellerStore &&
                (logic == "shipped"
                  ? x.DeleveredAt
                  : logic == "pending"
                  ? !x.DeleveredAt
                  : x._id)
            )
            .map((x) => x.price)
        : ord.orderItems.filter(
            (x) =>
              x.store == sellerStore &&
              (logic == "shipped"
                ? x.DeleveredAt
                : logic == "pending"
                ? !x.DeleveredAt
                : x._id)
          )
    );
  return data1
    .filter(String)
    .map((x) => (totalSales == "totalSales" ? x : x.length))
    .reduce((a, b) => a + parseInt(b), 0);
};

export const getUniqueValues = (array) =>
  array.length > 0
    ? array.reduce(
        (acc, currentValue) =>
          acc.includes(currentValue) ? acc : [...acc, currentValue],
        []
      )
    : null;

export const totalSaleOfTheDay = (day, array, sellerStore) => {
  const totalSale = array
    .filter(String)
    .filter((x) => moment(x.createdAt).format("DD-MM-YYYY") == day, String)
    .map((x) =>
      x.orderItems
        .filter((y) => y.store == sellerStore)
        .map((y) => parseInt(y.price))
    );
  return [].concat.apply([], totalSale).reduce((a, b) => a + b, 0);
};
