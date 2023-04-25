module.exports = function(points, x0, y0, zoom) {
    // Определяем границы области кластеризации
    const size = 200 / zoom;
    const xMin = x0 - size/2;
    const xMax = x0 + size/2;
    const yMin = y0 - size/2;
    const yMax = y0 + size/2;
  
    // Разбиваем область кластеризации на ячейки
    const cells = [];
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < 10; i++) {
        const cell = {
          i: i,
          j: j,
          count: 0
        };
        cells.push(cell);
      }
    }
  
    // Для каждой ячейки подсчитываем количество точек, попавших в нее
    for (let point of points) {
      if (point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax) {
        const i = Math.floor((point.x - xMin) / size * 10);
        const j = Math.floor((point.y - yMin) / size * 10);
        const index = j*10 + i;
        cells[index].count++;
      }
    }
  
    // Формируем массив объектов с информацией о ячейках и количестве точек в них
    const result = [];
    for (let cell of cells) {
      if (cell.count > 0) {
        result.push(cell);
      }
    }
  
    // Сортируем массив объектов по строкам j, затем по столбцам i
    result.sort((a, b) => {
      if (a.j === b.j) {
        return a.i - b.i;
      } else {
        return a.j - b.j;
      }
    });
  
    return result;
  }