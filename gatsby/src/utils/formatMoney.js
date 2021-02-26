const formatter = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const formatMoney = (cents) => {
  return formatter.format(cents / 100);
};

export default formatMoney;
