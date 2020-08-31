document.addEventListener('DOMContentLoaded', function () {
  function subKeywords1(line) {
    return line.replace(/\b(symbol|shares|type|qty|side|limit_price|time_in_force|amount|currency|source|description)\b/g, function (a) {
      return '<span class="keyword1">' + a + '</span>';
    });
  }
  function subKeywords2(line) {
    return line.replace(/\b(const|await)\b/g, function (a) {
      return '<span class="keyword2">' + a + '</span>';
    });
  }
  function subKeywords3(line) {
    return line.replace(/\b(import|as)\b/g, function (a) {
      return '<span class="keyword3">' + a + '</span>';
    });
  }
  function subComments(line) {
    return (line[0] == "/") ? '<span class="comment">' + line + '</span>' : line
  }
  function subLiteral(line) {
    return line.replace(/'.+'/g, function (a) {
      return '<span class="literal">' + a + '</span>';
    });
  }
  document.querySelectorAll('script[type="text/code-snippet"]').forEach(function (node) {
    var div = document.createElement('div');
    var body = node.innerText.split('\n').map(function (line, no) {
      return (
        '<tr>' +
        // <td class="blob-num js-line-number" data-line-number="' + (no + 1) + '"></td>' +
        '<td class="blob-code blob-code-inner js-file-line">' + subLiteral(subKeywords3(subKeywords1(subKeywords2(subComments(line))))) + '</td></tr>'
      );
    }).join("");
    div.innerHTML = '<table class="code-snippet-box">' + body + '</table>';

    node.parentNode.insertBefore(div.firstChild, node);
  })
});