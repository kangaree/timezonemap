// TODO: account for DST difference
// TODO: start on the current hour instead of UTC

let previousOffset = 0
window.addEventListener("load", function () {
  const selectElement = document.getElementById("tz");

  if (selectElement) {
    selectElement.addEventListener("change", (event) => {
      clearSVGElements(previousOffset);
      findSVGElements(Number(event.target.value));
      previousOffset = Number(event.target.value);
    });
  }

  findSVGElements();
});

// http://xn--dahlstrm-t4a.net/svg/html/get-embedded-svg-document-script.html
function getSubDocument(embedding_element) {
  if (embedding_element.contentDocument) {
    return embedding_element.contentDocument;
  } else {
    var subdoc = null;
    try {
      subdoc = embedding_element.getSVGDocument();
    } catch (e) {}
    return subdoc;
  }
}

function findSVGElements(offset = 0) {
  const offsetTimezones = timezones.filter(
    (timezone) => timezone.offset === offset
  );

  offsetTimezones.forEach((offsetTimezone) => {
    offsetTimezone.utc?.forEach((tz) => {
      const key = getKeyByValue(tzToCountries, tz);

      if (key) {
        var elms = document.querySelectorAll("#world");
        for (var i = 0; i < elms.length; i++) {
          var subdoc = getSubDocument(elms[i]);
          const spagett = subdoc.getElementById(key.toLowerCase());
          if (spagett) {
            spagett.setAttribute("fill", "gold");
          }
        }
      }
    });
  });
}

function clearSVGElements(offset) {
    const offsetTimezones = timezones.filter(
    (timezone) => timezone.offset === offset
    );

    offsetTimezones.forEach((offsetTimezone) => {
    offsetTimezone.utc?.forEach((tz) => {
        const key = getKeyByValue(tzToCountries, tz);

        if (key) {
        var elms = document.querySelectorAll("#world");
        for (var i = 0; i < elms.length; i++) {
            var subdoc = getSubDocument(elms[i]);
            const spagett = subdoc.getElementById(key.toLowerCase());
            if (spagett) {
            spagett.setAttribute("fill", "black");
            }
        }
        }
    });
    });
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => {
    if (!object[key]) {
      return null;
    }
    return object[key].includes(value);
  });
}
