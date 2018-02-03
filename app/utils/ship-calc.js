const table = {
  1: 7.50,
  2: 8.80,
  3: 10.10,
  4: 11.40,
  5: 12.70,
  6: 14.00,
  7: 15.30,
  8: 16.60,
  9: 17.90,
  10: 19.20,
  11: 20.50,
  12: 21.80,
  13: 23.10,
  14: 24.40,
  15: 25.70,
  16: 27.00,
  17: 28.30,
  18: 29.60,
  19: 30.90,
  20: 32.20,
  21: 33.50,
  22: 34.80,
  23: 36.10,
  24: 37.40,
  25: 38.70,
  26: 40.00,
  27: 41.30,
  28: 42.60,
  29: 43.90,
  30: 45.20,
  31: 46.50,
  32: 47.80,
  33: 49.10,
  34: 50.40,
  35: 51.70,
  36: 53.00,
  37: 54.30,
  38: 55.60,
  39: 56.90,
  40: 58.20,
  41: 59.50,
  42: 60.80,
  43: 62.10,
  44: 63.40,
  45: 64.70,
  46: 66.00,                                                                                                                                                                         
  47: 67.30,
  48: 68.60,
  49: 69.90,
  50: 71.20,
  51: 72.50,
  52: 73.80,
  53: 75.10,
  54: 76.40,
  55: 77.70,
  56: 79.00,
  57: 80.30,
  58: 81.60,
  59: 82.90,
  60: 84.20,
  61: 85.50,
  62: 86.80,
  63: 88.10,
  64: 89.40,
  65: 90.70,
  66: 92.00,
  67: 93.30,
  68: 94.60,
  69: 95.90,
  70: 97.20,
  71: 98.50,
  72: 99.80,
  73: 101.10,
  74: 102.40,
  75: 103.70,
  76: 105.00,
  77: 106.30,
  78: 107.60,
  79: 108.90,
  80: 110.20
}

export default table;

export function makeAddress(addr, email) {
  return {
    sender_FirstName: addr.firstname,
    sender_LastName: addr.lastname,
    sender_Address1: addr.address1,
    sender_Address2: addr.address2,
    sender_City: addr.city,
    sender_State: addr.state,
    sender_ZIP: addr.zipcode,
    sender_Country_Code: addr.country,
    sender_Phone: addr.phonenumber,
    sender_Email: email,
    cnee_FirstName: addr.firstname,
    cnee_LastName: addr.lastname,
    cnee_Address1: addr.address1,
    cnee_Address2: addr.address2,
    cnee_City: addr.city,
    cnee_State: addr.state,
    cnee_ZIP: addr.zipcode,
    cnee_Country_Code: addr.country,
    cnee_Phone: addr.phonenumber,
    cnee_Email: email
  }
}

export function makeItems(items) {
  return items.map(i => {
    const item_Options = Object.entries(
      i.variationAttributes || {}).map(kv => kv.join(':')).join(' ');
    return {
      item_ID: i.ASIN,
      item_Name: i.title,
      item_Brand: i.retailer,
      unit_Price: (i.price)/100,
      quantity: i.quantity,
      item_DetailURL: i.detailPageUrl,
      item_ImageURL: i.image,
      item_Options
    }
  });
}

export function makeMetaItems(items) {
  return items.map(i => {
    const item_Options = Object.entries(
      i.variations || {}).map(kv => kv.join(':')).join(' ');
    return {
      item_ID: i.productId,
      item_Name: i.title,
      item_Brand: i.manufacturer,
      unit_Price: (i.price),
      quantity: i.quantity,
      item_DetailURL: i.linkToMarket,
      item_ImageURL: i.image,
      item_Options
    }
  });
}

function volumeByQty({ height, width, length }, q) {
  return ((height * width * length) / 139) * q;
}
function weightByQty({ weight }, q) {
  return weight * q;
}
export function estShipFee(items) {
  const vs = items.map(i => {
    return volumeByQty(i.packageDimensions, i.quantity);
  }).reduce((x, y) => x + y);
  const ws = items.map(i => {
    return weightByQty(i.packageDimensions, i.quantity);
  }).reduce((x, y) => x + y);
  const index = Math.ceil(Math.max(vs, ws));
  const fee = table[index] * 1.1;
  // promotional but we done make it a zero amount because
  // there is still a chance to capture more than zero.
  return parseFloat(fee.toFixed(2));
};
