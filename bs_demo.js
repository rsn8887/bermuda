
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'bs_demo.dat';
    var REMOTE_PACKAGE_BASE = 'bs_demo.dat';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
      var REMOTE_PACKAGE_SIZE = 6958393;
      var PACKAGE_UUID = '083b3563-f73d-44bb-afd3-39f450868976';
    
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'DATA', true, true);
Module['FS_createPath']('/DATA', 'JACK', true, true);
Module['FS_createPath']('/DATA', 'GIRL', true, true);
Module['FS_createPath']('/DATA', 'WAV', true, true);
Module['FS_createPath']('/DATA', '02', true, true);
Module['FS_createPath']('/DATA', '04', true, true);
Module['FS_createPath']('/DATA', 'WGP', true, true);
Module['FS_createPath']('/DATA', 'SCN', true, true);
Module['FS_createPath']('/DATA', '01', true, true);
Module['FS_createPath']('/DATA', '03', true, true);
Module['FS_createPath']('/', 'MUSIC', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };

      new DataRequest(0, 7710, 0, 0).open('GET', '/DATA/BERMUDA.WGP');
    new DataRequest(7710, 16472, 0, 0).open('GET', '/DATA/BERMUDA.SPR');
    new DataRequest(16472, 203187, 0, 0).open('GET', '/DATA/JACK/JACK_G.SPR');
    new DataRequest(203187, 214960, 0, 0).open('GET', '/DATA/JACK/JACK_G.MOV');
    new DataRequest(214960, 221664, 0, 0).open('GET', '/DATA/JACK/FIRE.SPR');
    new DataRequest(221664, 223563, 0, 0).open('GET', '/DATA/JACK/FIRE.MOV');
    new DataRequest(223563, 239495, 0, 0).open('GET', '/DATA/JACK/JACK.MOV');
    new DataRequest(239495, 631982, 0, 0).open('GET', '/DATA/JACK/JACK.SPR');
    new DataRequest(631982, 644486, 0, 0).open('GET', '/DATA/GIRL/GIRL.MOV');
    new DataRequest(644486, 846829, 0, 0).open('GET', '/DATA/GIRL/GIRL.SPR');
    new DataRequest(846829, 852313, 0, 0).open('GET', '/DATA/WAV/J_UP.WAV');
    new DataRequest(852313, 855506, 0, 0).open('GET', '/DATA/WAV/CROC.WAV');
    new DataRequest(855506, 868920, 0, 0).open('GET', '/DATA/WAV/ACRO3.WAV');
    new DataRequest(868920, 874421, 0, 0).open('GET', '/DATA/WAV/CUT.WAV');
    new DataRequest(874421, 878894, 0, 0).open('GET', '/DATA/WAV/J_GUN1.WAV');
    new DataRequest(878894, 880742, 0, 0).open('GET', '/DATA/WAV/J_KNIF1.WAV');
    new DataRequest(880742, 884913, 0, 0).open('GET', '/DATA/WAV/J_KNIF2.WAV');
    new DataRequest(884913, 892151, 0, 0).open('GET', '/DATA/WAV/J_STOP.WAV');
    new DataRequest(892151, 896756, 0, 0).open('GET', '/DATA/WAV/J_STEPG.WAV');
    new DataRequest(896756, 908967, 0, 0).open('GET', '/DATA/WAV/KICK2.WAV');
    new DataRequest(908967, 922428, 0, 0).open('GET', '/DATA/WAV/BOX.WAV');
    new DataRequest(922428, 931580, 0, 0).open('GET', '/DATA/WAV/J_TURN2.WAV');
    new DataRequest(931580, 935540, 0, 0).open('GET', '/DATA/WAV/J_JUMP1.WAV');
    new DataRequest(935540, 945894, 0, 0).open('GET', '/DATA/WAV/RAM3.WAV');
    new DataRequest(945894, 948021, 0, 0).open('GET', '/DATA/WAV/J_STEPW.WAV');
    new DataRequest(948021, 958745, 0, 0).open('GET', '/DATA/WAV/KICK1.WAV');
    new DataRequest(958745, 971098, 0, 0).open('GET', '/DATA/WAV/ACRO5.WAV');
    new DataRequest(971098, 980052, 0, 0).open('GET', '/DATA/WAV/ACRO4.WAV');
    new DataRequest(980052, 994384, 0, 0).open('GET', '/DATA/WAV/FALL.WAV');
    new DataRequest(994384, 996280, 0, 0).open('GET', '/DATA/WAV/J_HANG.WAV');
    new DataRequest(996280, 998176, 0, 0).open('GET', '/DATA/WAV/J_RUN.WAV');
    new DataRequest(998176, 1002182, 0, 0).open('GET', '/DATA/WAV/J_GUN.WAV');
    new DataRequest(1002182, 1008925, 0, 0).open('GET', '/DATA/WAV/J_TURN1.WAV');
    new DataRequest(1008925, 1031222, 0, 0).open('GET', '/DATA/WAV/ACRO1.WAV');
    new DataRequest(1031222, 1052130, 0, 0).open('GET', '/DATA/WAV/J_SHOOT.WAV');
    new DataRequest(1052130, 1053806, 0, 0).open('GET', '/DATA/WAV/J_2WALL.WAV');
    new DataRequest(1053806, 1066889, 0, 0).open('GET', '/DATA/02/BOX.SPR');
    new DataRequest(1066889, 1066976, 0, 0).open('GET', '/DATA/02/VIEW.MOV');
    new DataRequest(1066976, 1067647, 0, 0).open('GET', '/DATA/02/BOX.MOV');
    new DataRequest(1067647, 1068326, 0, 0).open('GET', '/DATA/02/EXTRA.MOV');
    new DataRequest(1068326, 1121238, 0, 0).open('GET', '/DATA/02/EXTRA.SPR');
    new DataRequest(1121238, 1247408, 0, 0).open('GET', '/DATA/02/MONSTER.SPR');
    new DataRequest(1247408, 1247469, 0, 0).open('GET', '/DATA/02/SCR.MOV');
    new DataRequest(1247469, 1248554, 0, 0).open('GET', '/DATA/02/VIEW.SPR');
    new DataRequest(1248554, 1256472, 0, 0).open('GET', '/DATA/02/SCR.SPR');
    new DataRequest(1256472, 1263565, 0, 0).open('GET', '/DATA/02/MONSTER.MOV');
    new DataRequest(1263565, 1710705, 0, 0).open('GET', '/DATA/04/CROC.SPR');
    new DataRequest(1710705, 1713111, 0, 0).open('GET', '/DATA/04/RAMFOR.MOV');
    new DataRequest(1713111, 1714769, 0, 0).open('GET', '/DATA/04/CROC.MOV');
    new DataRequest(1714769, 1714976, 0, 0).open('GET', '/DATA/04/WATER.MOV');
    new DataRequest(1714976, 1806084, 0, 0).open('GET', '/DATA/04/RAMFOR.SPR');
    new DataRequest(1806084, 1877162, 0, 0).open('GET', '/DATA/04/WATER.SPR');
    new DataRequest(1877162, 1970595, 0, 0).open('GET', '/DATA/WGP/TITLE2.WGP');
    new DataRequest(1970595, 2139407, 0, 0).open('GET', '/DATA/WGP/-03.WGP');
    new DataRequest(2139407, 2315284, 0, 0).open('GET', '/DATA/WGP/-01.WGP');
    new DataRequest(2315284, 2475716, 0, 0).open('GET', '/DATA/WGP/-04.WGP');
    new DataRequest(2475716, 2481503, 0, 0).open('GET', '/DATA/WGP/TITLE.WGP');
    new DataRequest(2481503, 2507572, 0, 0).open('GET', '/DATA/WGP/TITLE1.WGP');
    new DataRequest(2507572, 2706613, 0, 0).open('GET', '/DATA/WGP/-02.WGP');
    new DataRequest(2706613, 2706866, 0, 0).open('GET', '/DATA/SCN/-00.SCN');
    new DataRequest(2706866, 2709903, 0, 0).open('GET', '/DATA/SCN/-03.SCN');
    new DataRequest(2709903, 2711229, 0, 0).open('GET', '/DATA/SCN/-02.SCN');
    new DataRequest(2711229, 2713317, 0, 0).open('GET', '/DATA/SCN/-01.SCN');
    new DataRequest(2713317, 2715063, 0, 0).open('GET', '/DATA/SCN/-04.SCN');
    new DataRequest(2715063, 2715326, 0, 0).open('GET', '/DATA/01/PRIEST.MOV');
    new DataRequest(2715326, 2715330, 0, 0).open('GET', '/DATA/01/KNIFE.SPR');
    new DataRequest(2715330, 2716515, 0, 0).open('GET', '/DATA/01/GIRL.MOV');
    new DataRequest(2716515, 2821399, 0, 0).open('GET', '/DATA/01/PRIEST.SPR');
    new DataRequest(2821399, 2821485, 0, 0).open('GET', '/DATA/01/VIEW.MOV');
    new DataRequest(2821485, 2822382, 0, 0).open('GET', '/DATA/01/EXTRA.MOV');
    new DataRequest(2822382, 2985998, 0, 0).open('GET', '/DATA/01/EXTRA.SPR');
    new DataRequest(2985998, 2987095, 0, 0).open('GET', '/DATA/01/VIEW.SPR');
    new DataRequest(2987095, 2987245, 0, 0).open('GET', '/DATA/01/PTER.MOV');
    new DataRequest(2987245, 2988749, 0, 0).open('GET', '/DATA/01/PTER.SPR');
    new DataRequest(2988749, 3091113, 0, 0).open('GET', '/DATA/01/GIRL.SPR');
    new DataRequest(3091113, 3092489, 0, 0).open('GET', '/DATA/03/FOOD.SPR');
    new DataRequest(3092489, 3092785, 0, 0).open('GET', '/DATA/03/FOOD.MOV');
    new DataRequest(3092785, 4240544, 0, 0).open('GET', '/DATA/03/ACRO.SPR');
    new DataRequest(4240544, 4245077, 0, 0).open('GET', '/DATA/03/ACRO.MOV');
    new DataRequest(4245077, 6958393, 0, 1).open('GET', '/MUSIC/track03.ogg');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // Reuse the bytearray from the XHR as the source for file reads.
      DataRequest.prototype.byteArray = byteArray;
          DataRequest.prototype.requests["/DATA/BERMUDA.WGP"].onload();
          DataRequest.prototype.requests["/DATA/BERMUDA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK_G.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK_G.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/FIRE.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/FIRE.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK.SPR"].onload();
          DataRequest.prototype.requests["/DATA/GIRL/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/GIRL/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_UP.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/CROC.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/CUT.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_GUN1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_KNIF1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_KNIF2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STOP.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STEPG.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/KICK2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BOX.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TURN2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_JUMP1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/RAM3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STEPW.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/KICK1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO5.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO4.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/FALL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_HANG.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_RUN.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_GUN.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TURN1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_SHOOT.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_2WALL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/02/BOX.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/BOX.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/MONSTER.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/SCR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/SCR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/MONSTER.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/CROC.SPR"].onload();
          DataRequest.prototype.requests["/DATA/04/RAMFOR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/CROC.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/WATER.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/RAMFOR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/04/WATER.SPR"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE2.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-03.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-01.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-04.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE1.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-02.WGP"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-00.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-03.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-02.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-01.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-04.SCN"].onload();
          DataRequest.prototype.requests["/DATA/01/PRIEST.MOV"].onload();
          DataRequest.prototype.requests["/DATA/01/KNIFE.SPR"].onload();
          DataRequest.prototype.requests["/DATA/01/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/01/PRIEST.SPR"].onload();
          DataRequest.prototype.requests["/DATA/01/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/01/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/01/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/01/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/01/PTER.MOV"].onload();
          DataRequest.prototype.requests["/DATA/01/PTER.SPR"].onload();
          DataRequest.prototype.requests["/DATA/01/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/03/FOOD.SPR"].onload();
          DataRequest.prototype.requests["/DATA/03/FOOD.MOV"].onload();
          DataRequest.prototype.requests["/DATA/03/ACRO.SPR"].onload();
          DataRequest.prototype.requests["/DATA/03/ACRO.MOV"].onload();
          DataRequest.prototype.requests["/MUSIC/track03.ogg"].onload();
          Module['removeRunDependency']('datafile_bs_demo.dat');

    };
    Module['addRunDependency']('datafile_bs_demo.dat');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage();

})();

