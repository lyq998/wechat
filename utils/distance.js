const EARTH_RADIUS = 6378137.0; 
var ConvertDegreesToRadians = function (degrees) {
  return degrees * Math.PI / 180;
}
var ConvertRadiansToDegrees = function (radian) {
  return radian * 180.0 / Math.PI;
}
var HaverSin = function (theta) {
  var v = Math.sin(theta / 2);
  return v * v;
}
var Distance = function (lat1, lon1, lat2, lon2) {
  //经纬度转换成弧度
  lat1 = ConvertDegreesToRadians(lat1);
  lon1 = ConvertDegreesToRadians(lon1);
  lat2 = ConvertDegreesToRadians(lat2);
  lon2 = ConvertDegreesToRadians(lon2);

  //差值
  var vLon = Math.abs(lon1 - lon2);
  var vLat = Math.abs(lat1 - lat2);

  var h = HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(vLon);
  var distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
  return distance;
}
module.exports = {
  ConvertDegreesToRadians: ConvertDegreesToRadians,
  ConvertRadiansToDegrees: ConvertRadiansToDegrees,
  HaverSin: HaverSin,
  Distance: Distance,
};