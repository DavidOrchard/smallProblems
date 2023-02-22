class Screen {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    get diagonal() {
      return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    }
    
    /**
     * @param {string} definition
     */
    set dimensions(definition) {
      var dimensions = definition.split('x');
      var width = parseInt(dimensions[0]);
      var height = parseInt(dimensions[1]);
  
      if(width !== NaN && width >= 0) this.width = width;
      if(height !== NaN && height >= 0) this.height = height;
    }
  }
  
  var screen = new Screen(0, 0);
  screen.dimensions = '500x300';
  screen.width = 400;
  console.log(screen.diagonal); // Should print 500