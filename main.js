var url = "https://codember.dev/users.txt";
var contador = 0;
var arrayCompletoObj = {};

fetch(url).then(function (response) {
  response.text().then(function (text) {
    procesarTexto(text);
  });
});
function funcX (elemento) {
    var data = arrayCompletoObj[contador] || [];
    if (elemento.length) {
      if (data.length) {
        arrayCompletoObj[contador] = [...data, elemento];
      } else {
        data.push(elemento);
        arrayCompletoObj[contador] = data;
      }
    } else {
      contador++;
    }
  }
function procesarTexto(texto) {
  var stringToArray = texto.split("\n");
  var recorrerConMap = stringToArray.map(funcX);
  var unionArray = Object.values(arrayCompletoObj).map((item) =>
    item.join(" ").split(" ")
  );
  var casiCorrectos = unionArray
    .filter((item) => item.length === 6)
    .map((item) =>
      item
        .map((element) => {
          const [key, value] = element.split(":");
          return { [key]: value };
        })
        .reduce((acc, item) => ({ ...acc, ...item }), {})
    );
    const validation = ['usr', 'eme', 'psw', 'age', 'loc', 'fll'].sort().join("")
    var keysCasiCorrectos = casiCorrectos.map((item) => Object.keys(item).sort().join("")).filter((item) => item === validation)
  console.log({ arrayCompletoObj, unionArray, casiCorrectos, keysCasiCorrectos, validation });
}
