
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
  
      var REMOTE_PACKAGE_SIZE = 9242205;
      var PACKAGE_UUID = '4d3239dd-a40c-4445-b768-9873db70a036';
    
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
    new DataRequest(16472, 269762, 0, 0).open('GET', '/DATA/JACK/JACK_G.SPR');
    new DataRequest(269762, 281535, 0, 0).open('GET', '/DATA/JACK/JACK_G.MOV');
    new DataRequest(281535, 290103, 0, 0).open('GET', '/DATA/JACK/FIRE.SPR');
    new DataRequest(290103, 292002, 0, 0).open('GET', '/DATA/JACK/FIRE.MOV');
    new DataRequest(292002, 307934, 0, 0).open('GET', '/DATA/JACK/JACK.MOV');
    new DataRequest(307934, 838334, 0, 0).open('GET', '/DATA/JACK/JACK.SPR');
    new DataRequest(838334, 850838, 0, 0).open('GET', '/DATA/GIRL/GIRL.MOV');
    new DataRequest(850838, 1132938, 0, 0).open('GET', '/DATA/GIRL/GIRL.SPR');
    new DataRequest(1132938, 1138422, 0, 0).open('GET', '/DATA/WAV/J_UP.WAV');
    new DataRequest(1138422, 1141615, 0, 0).open('GET', '/DATA/WAV/CROC.WAV');
    new DataRequest(1141615, 1155029, 0, 0).open('GET', '/DATA/WAV/ACRO3.WAV');
    new DataRequest(1155029, 1160530, 0, 0).open('GET', '/DATA/WAV/CUT.WAV');
    new DataRequest(1160530, 1165003, 0, 0).open('GET', '/DATA/WAV/J_GUN1.WAV');
    new DataRequest(1165003, 1166851, 0, 0).open('GET', '/DATA/WAV/J_KNIF1.WAV');
    new DataRequest(1166851, 1171022, 0, 0).open('GET', '/DATA/WAV/J_KNIF2.WAV');
    new DataRequest(1171022, 1178260, 0, 0).open('GET', '/DATA/WAV/J_STOP.WAV');
    new DataRequest(1178260, 1182865, 0, 0).open('GET', '/DATA/WAV/J_STEPG.WAV');
    new DataRequest(1182865, 1195076, 0, 0).open('GET', '/DATA/WAV/KICK2.WAV');
    new DataRequest(1195076, 1208537, 0, 0).open('GET', '/DATA/WAV/BOX.WAV');
    new DataRequest(1208537, 1217689, 0, 0).open('GET', '/DATA/WAV/J_TURN2.WAV');
    new DataRequest(1217689, 1221649, 0, 0).open('GET', '/DATA/WAV/J_JUMP1.WAV');
    new DataRequest(1221649, 1232003, 0, 0).open('GET', '/DATA/WAV/RAM3.WAV');
    new DataRequest(1232003, 1234130, 0, 0).open('GET', '/DATA/WAV/J_STEPW.WAV');
    new DataRequest(1234130, 1244854, 0, 0).open('GET', '/DATA/WAV/KICK1.WAV');
    new DataRequest(1244854, 1257207, 0, 0).open('GET', '/DATA/WAV/ACRO5.WAV');
    new DataRequest(1257207, 1266161, 0, 0).open('GET', '/DATA/WAV/ACRO4.WAV');
    new DataRequest(1266161, 1280493, 0, 0).open('GET', '/DATA/WAV/FALL.WAV');
    new DataRequest(1280493, 1282389, 0, 0).open('GET', '/DATA/WAV/J_HANG.WAV');
    new DataRequest(1282389, 1284285, 0, 0).open('GET', '/DATA/WAV/J_RUN.WAV');
    new DataRequest(1284285, 1288291, 0, 0).open('GET', '/DATA/WAV/J_GUN.WAV');
    new DataRequest(1288291, 1295034, 0, 0).open('GET', '/DATA/WAV/J_TURN1.WAV');
    new DataRequest(1295034, 1317331, 0, 0).open('GET', '/DATA/WAV/ACRO1.WAV');
    new DataRequest(1317331, 1338239, 0, 0).open('GET', '/DATA/WAV/J_SHOOT.WAV');
    new DataRequest(1338239, 1339915, 0, 0).open('GET', '/DATA/WAV/J_2WALL.WAV');
    new DataRequest(1339915, 1356105, 0, 0).open('GET', '/DATA/02/BOX.SPR');
    new DataRequest(1356105, 1356192, 0, 0).open('GET', '/DATA/02/VIEW.MOV');
    new DataRequest(1356192, 1356863, 0, 0).open('GET', '/DATA/02/BOX.MOV');
    new DataRequest(1356863, 1357542, 0, 0).open('GET', '/DATA/02/EXTRA.MOV');
    new DataRequest(1357542, 1426802, 0, 0).open('GET', '/DATA/02/EXTRA.SPR');
    new DataRequest(1426802, 1590846, 0, 0).open('GET', '/DATA/02/MONSTER.SPR');
    new DataRequest(1590846, 1590907, 0, 0).open('GET', '/DATA/02/SCR.MOV');
    new DataRequest(1590907, 1592363, 0, 0).open('GET', '/DATA/02/VIEW.SPR');
    new DataRequest(1592363, 1602101, 0, 0).open('GET', '/DATA/02/SCR.SPR');
    new DataRequest(1602101, 1609194, 0, 0).open('GET', '/DATA/02/MONSTER.MOV');
    new DataRequest(1609194, 2196612, 0, 0).open('GET', '/DATA/04/CROC.SPR');
    new DataRequest(2196612, 2199018, 0, 0).open('GET', '/DATA/04/RAMFOR.MOV');
    new DataRequest(2199018, 2200676, 0, 0).open('GET', '/DATA/04/CROC.MOV');
    new DataRequest(2200676, 2200883, 0, 0).open('GET', '/DATA/04/WATER.MOV');
    new DataRequest(2200883, 2315717, 0, 0).open('GET', '/DATA/04/RAMFOR.SPR');
    new DataRequest(2315717, 2406395, 0, 0).open('GET', '/DATA/04/WATER.SPR');
    new DataRequest(2406395, 2623937, 0, 0).open('GET', '/DATA/WGP/-03.WGP');
    new DataRequest(2623937, 2932215, 0, 0).open('GET', '/DATA/WGP/TITLE3.BMP');
    new DataRequest(2932215, 3148557, 0, 0).open('GET', '/DATA/WGP/-01.WGP');
    new DataRequest(3148557, 3456835, 0, 0).open('GET', '/DATA/WGP/TITLE1.BMP');
    new DataRequest(3456835, 3656185, 0, 0).open('GET', '/DATA/WGP/-04.WGP');
    new DataRequest(3656185, 3909263, 0, 0).open('GET', '/DATA/WGP/-02.WGP');
    new DataRequest(3909263, 4217541, 0, 0).open('GET', '/DATA/WGP/TITLE2.BMP');
    new DataRequest(4217541, 4525819, 0, 0).open('GET', '/DATA/WGP/TITLE.BMP');
    new DataRequest(4525819, 4526072, 0, 0).open('GET', '/DATA/SCN/-00.SCN');
    new DataRequest(4526072, 4529109, 0, 0).open('GET', '/DATA/SCN/-03.SCN');
    new DataRequest(4529109, 4530435, 0, 0).open('GET', '/DATA/SCN/-02.SCN');
    new DataRequest(4530435, 4532523, 0, 0).open('GET', '/DATA/SCN/-01.SCN');
    new DataRequest(4532523, 4534269, 0, 0).open('GET', '/DATA/SCN/-04.SCN');
    new DataRequest(4534269, 4534532, 0, 0).open('GET', '/DATA/01/PRIEST.MOV');
    new DataRequest(4534532, 4535096, 0, 0).open('GET', '/DATA/01/KNIFE.SPR');
    new DataRequest(4535096, 4536281, 0, 0).open('GET', '/DATA/01/GIRL.MOV');
    new DataRequest(4536281, 4664587, 0, 0).open('GET', '/DATA/01/PRIEST.SPR');
    new DataRequest(4664587, 4664673, 0, 0).open('GET', '/DATA/01/VIEW.MOV');
    new DataRequest(4664673, 4665570, 0, 0).open('GET', '/DATA/01/EXTRA.MOV');
    new DataRequest(4665570, 4881696, 0, 0).open('GET', '/DATA/01/EXTRA.SPR');
    new DataRequest(4881696, 4883184, 0, 0).open('GET', '/DATA/01/VIEW.SPR');
    new DataRequest(4883184, 4883334, 0, 0).open('GET', '/DATA/01/PTER.MOV');
    new DataRequest(4883334, 4885212, 0, 0).open('GET', '/DATA/01/PTER.SPR');
    new DataRequest(4885212, 5029948, 0, 0).open('GET', '/DATA/01/GIRL.SPR');
    new DataRequest(5029948, 5031622, 0, 0).open('GET', '/DATA/03/FOOD.SPR');
    new DataRequest(5031622, 5031918, 0, 0).open('GET', '/DATA/03/FOOD.MOV');
    new DataRequest(5031918, 6524356, 0, 0).open('GET', '/DATA/03/ACRO.SPR');
    new DataRequest(6524356, 6528889, 0, 0).open('GET', '/DATA/03/ACRO.MOV');
    new DataRequest(6528889, 9242205, 0, 1).open('GET', '/MUSIC/track03.ogg');

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
          DataRequest.prototype.requests["/DATA/WGP/-03.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE3.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-01.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE1.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-04.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-02.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE2.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE.BMP"].onload();
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

