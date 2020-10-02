export function getToken(){
  var re = new RegExp("JWToken" + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}