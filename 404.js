'use strict';
let _this = this;
(function() {
    var isAdjoinCell = function(cell1, cell2) {
        if (cell1.x == cell2.x && Math.abs(cell1.y - cell2.y) < 2) return true;
        if (cell1.y == cell2.y && Math.abs(cell1.x - cell2.x) < 2) return true;
        return false;
    }
    var stack = new Array({ x: x > 0 ? x : 0, y: y > 0 ? y : 0, c: "", vis: false });
    var cells = v.m;
    var last = new Array();
    while (stack.length > 0) {
        var current = stack[stack.length - 1];
        if (v.isEnd(current.x, current.y)) { //路径找到
            while (stack.length > 0) {
                var cell = stack.pop();
                last.unshift({ x: cells[cell.y][cell.x].x, y: cells[cell.y][cell.x].y });
                //堆栈中与 cell 相邻的单元才是路径的组成部分，除此之外，
                //堆栈中还有记录下来但是未继续向下探索的单元，
                //这些单元直接出栈
                while (stack.length > 0 && !isAdjoinCell(stack[stack.length - 1], cell)) stack.pop();
            }
            var l = { x: 0, y: 0 };
            for (var i in last) {
                if (last[i].x - l.x == 1) {
                    _this.move("right");
                }
                if (last[i].y - l.y == 1) {
                    _this.move("down")
                }
                if (l.y - last[i].y == 1) {
                    _this.move("up")
                }
                if (l.x - last[i].x == 1) {
                    _this.move("left")
                }

                l = last[i]
            }
            break;
        } else { //如果当前位置不是终点
            var x = current.x;
            var y = current.y;
            var count = 0;
            var c = v.getCell(x, y);

            if (!1 === c["up"] && v.inBounds(x, y - 1) && !cells[y - 1][x].vis) { //向上
                stack.push(v.getCell(x, y - 1));
                cells[y - 1][x].vis = true;
                count++;
            }
            if (!1 === c["left"] && v.inBounds(x - 1, y) && !cells[y][x - 1].vis) { //向左
                stack.push(v.getCell(x - 1, y));
                cells[y][x - 1].vis = true;
                count++;
            }
            if (!1 === c["down"] && v.inBounds(x, y + 1) && !cells[y + 1][x].vis) { //向下
                stack.push(v.getCell(x, y + 1));
                cells[y + 1][x].vis = true;
                count++;
            }
            if (!1 === c["right"] && v.inBounds(x + 1, y) && !cells[y][x + 1].vis) { //向右
                stack.push(v.getCell(x + 1, y));
                cells[y][x + 1].vis = true;
                count++;
            }
            if (count == 0) stack.pop(); //如果是死点，出栈
        } //end of if
    } //end of while
}());