
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
  
      var REMOTE_PACKAGE_SIZE = 20785699;
      var PACKAGE_UUID = '2ad73172-9618-431e-af5b-b7bedad8a812';
    
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
Module['FS_createPath']('/DATA', '25', true, true);
Module['FS_createPath']('/DATA', 'JACK', true, true);
Module['FS_createPath']('/DATA', '09', true, true);
Module['FS_createPath']('/DATA', 'GIRL', true, true);
Module['FS_createPath']('/DATA', 'WAV', true, true);
Module['FS_createPath']('/DATA', '02', true, true);
Module['FS_createPath']('/DATA', 'CAVE1', true, true);
Module['FS_createPath']('/DATA', '16', true, true);
Module['FS_createPath']('/DATA', '22', true, true);
Module['FS_createPath']('/DATA', '24', true, true);
Module['FS_createPath']('/DATA', '00', true, true);
Module['FS_createPath']('/DATA', '04', true, true);
Module['FS_createPath']('/DATA', 'WGP', true, true);
Module['FS_createPath']('/DATA', 'SCN', true, true);
Module['FS_createPath']('/DATA', '01', true, true);
Module['FS_createPath']('/DATA', 'MIDI', true, true);
Module['FS_createPath']('/DATA', '03', true, true);
Module['FS_createPath']('/DATA', '08', true, true);
Module['FS_createPath']('/DATA', 'LAB02', true, true);
Module['FS_createPath']('/DATA', '26', true, true);
Module['FS_createPath']('/DATA', 'LAB01', true, true);
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

      new DataRequest(0, 4, 0, 0).open('GET', '/DATA/1-CDROM.DAT');
    new DataRequest(4, 7714, 0, 0).open('GET', '/DATA/BERMUDA.WGP');
    new DataRequest(7714, 16476, 0, 0).open('GET', '/DATA/BERMUDA.SPR');
    new DataRequest(16476, 17119, 0, 0).open('GET', '/DATA/25/WAV.MOV');
    new DataRequest(17119, 17725, 0, 0).open('GET', '/DATA/25/GIRL.MOV');
    new DataRequest(17725, 19286, 0, 0).open('GET', '/DATA/25/LIANA.MOV');
    new DataRequest(19286, 44812, 0, 0).open('GET', '/DATA/25/RAFT.SPR');
    new DataRequest(44812, 44869, 0, 0).open('GET', '/DATA/25/VIEW.MOV');
    new DataRequest(44869, 45426, 0, 0).open('GET', '/DATA/25/EXTRA.MOV');
    new DataRequest(45426, 260552, 0, 0).open('GET', '/DATA/25/EXTRA.SPR');
    new DataRequest(260552, 463642, 0, 0).open('GET', '/DATA/25/WAV.SPR');
    new DataRequest(463642, 464089, 0, 0).open('GET', '/DATA/25/RAFT.MOV');
    new DataRequest(464089, 464819, 0, 0).open('GET', '/DATA/25/VIEW.SPR');
    new DataRequest(464819, 514181, 0, 0).open('GET', '/DATA/25/LIANA.SPR');
    new DataRequest(514181, 758587, 0, 0).open('GET', '/DATA/25/GIRL.SPR');
    new DataRequest(758587, 1011877, 0, 0).open('GET', '/DATA/JACK/JACK_G.SPR');
    new DataRequest(1011877, 1023650, 0, 0).open('GET', '/DATA/JACK/JACK_G.MOV');
    new DataRequest(1023650, 1032218, 0, 0).open('GET', '/DATA/JACK/FIRE.SPR');
    new DataRequest(1032218, 1037011, 0, 0).open('GET', '/DATA/JACK/EXTRA.MOV');
    new DataRequest(1037011, 1360081, 0, 0).open('GET', '/DATA/JACK/EXTRA.SPR');
    new DataRequest(1360081, 1361980, 0, 0).open('GET', '/DATA/JACK/FIRE.MOV');
    new DataRequest(1361980, 1377912, 0, 0).open('GET', '/DATA/JACK/JACK.MOV');
    new DataRequest(1377912, 1908312, 0, 0).open('GET', '/DATA/JACK/JACK.SPR');
    new DataRequest(1908312, 2933678, 0, 0).open('GET', '/DATA/09/TOR.SPR');
    new DataRequest(2933678, 2935761, 0, 0).open('GET', '/DATA/09/TOR.MOV');
    new DataRequest(2935761, 2948265, 0, 0).open('GET', '/DATA/GIRL/GIRL.MOV');
    new DataRequest(2948265, 3230365, 0, 0).open('GET', '/DATA/GIRL/GIRL.SPR');
    new DataRequest(3230365, 3249543, 0, 0).open('GET', '/DATA/WAV/PTR1.WAV');
    new DataRequest(3249543, 3253914, 0, 0).open('GET', '/DATA/WAV/HOOK.WAV');
    new DataRequest(3253914, 3259398, 0, 0).open('GET', '/DATA/WAV/J_UP.WAV');
    new DataRequest(3259398, 3262591, 0, 0).open('GET', '/DATA/WAV/CROC.WAV');
    new DataRequest(3262591, 3276005, 0, 0).open('GET', '/DATA/WAV/ACRO3.WAV');
    new DataRequest(3276005, 3286631, 0, 0).open('GET', '/DATA/WAV/BIRD3.WAV');
    new DataRequest(3286631, 3300312, 0, 0).open('GET', '/DATA/WAV/BRU1.WAV');
    new DataRequest(3300312, 3311808, 0, 0).open('GET', '/DATA/WAV/RAM2.WAV');
    new DataRequest(3311808, 3319782, 0, 0).open('GET', '/DATA/WAV/MSTR1.WAV');
    new DataRequest(3319782, 3325283, 0, 0).open('GET', '/DATA/WAV/CUT.WAV');
    new DataRequest(3325283, 3331447, 0, 0).open('GET', '/DATA/WAV/MSTR3.WAV');
    new DataRequest(3331447, 3346306, 0, 0).open('GET', '/DATA/WAV/RAM1.WAV');
    new DataRequest(3346306, 3357476, 0, 0).open('GET', '/DATA/WAV/BIRD2.WAV');
    new DataRequest(3357476, 3361949, 0, 0).open('GET', '/DATA/WAV/J_GUN1.WAV');
    new DataRequest(3361949, 3369853, 0, 0).open('GET', '/DATA/WAV/BIRD1.WAV');
    new DataRequest(3369853, 3371701, 0, 0).open('GET', '/DATA/WAV/J_KNIF1.WAV');
    new DataRequest(3371701, 3382701, 0, 0).open('GET', '/DATA/WAV/J_TURN3.WAV');
    new DataRequest(3382701, 3386872, 0, 0).open('GET', '/DATA/WAV/J_KNIF2.WAV');
    new DataRequest(3386872, 3392729, 0, 0).open('GET', '/DATA/WAV/J_GUN2.WAV');
    new DataRequest(3392729, 3416210, 0, 0).open('GET', '/DATA/WAV/J_SWIM2.WAV');
    new DataRequest(3416210, 3419238, 0, 0).open('GET', '/DATA/WAV/MSTR4.WAV');
    new DataRequest(3419238, 3426476, 0, 0).open('GET', '/DATA/WAV/J_STOP.WAV');
    new DataRequest(3426476, 3431081, 0, 0).open('GET', '/DATA/WAV/J_STEPG.WAV');
    new DataRequest(3431081, 3443292, 0, 0).open('GET', '/DATA/WAV/KICK2.WAV');
    new DataRequest(3443292, 3456753, 0, 0).open('GET', '/DATA/WAV/BOX.WAV');
    new DataRequest(3456753, 3482450, 0, 0).open('GET', '/DATA/WAV/DIN1.WAV');
    new DataRequest(3482450, 3489499, 0, 0).open('GET', '/DATA/WAV/LIANA.WAV');
    new DataRequest(3489499, 3505793, 0, 0).open('GET', '/DATA/WAV/DIM3.WAV');
    new DataRequest(3505793, 3514945, 0, 0).open('GET', '/DATA/WAV/J_TURN2.WAV');
    new DataRequest(3514945, 3518905, 0, 0).open('GET', '/DATA/WAV/J_JUMP1.WAV');
    new DataRequest(3518905, 3542230, 0, 0).open('GET', '/DATA/WAV/J_SWIM1.WAV');
    new DataRequest(3542230, 3544876, 0, 0).open('GET', '/DATA/WAV/MOKR.WAV');
    new DataRequest(3544876, 3621103, 0, 0).open('GET', '/DATA/WAV/LIFT.WAV');
    new DataRequest(3621103, 3636107, 0, 0).open('GET', '/DATA/WAV/DIM2.WAV');
    new DataRequest(3636107, 3640727, 0, 0).open('GET', '/DATA/WAV/J_STOP1.WAV');
    new DataRequest(3640727, 3651081, 0, 0).open('GET', '/DATA/WAV/RAM3.WAV');
    new DataRequest(3651081, 3653208, 0, 0).open('GET', '/DATA/WAV/J_STEPW.WAV');
    new DataRequest(3653208, 3659372, 0, 0).open('GET', '/DATA/WAV/DIN4.WAV');
    new DataRequest(3659372, 3670096, 0, 0).open('GET', '/DATA/WAV/KICK1.WAV');
    new DataRequest(3670096, 3673445, 0, 0).open('GET', '/DATA/WAV/J_FALL.WAV');
    new DataRequest(3673445, 3685331, 0, 0).open('GET', '/DATA/WAV/BRU2.WAV');
    new DataRequest(3685331, 3704979, 0, 0).open('GET', '/DATA/WAV/PTR3.WAV');
    new DataRequest(3704979, 3717332, 0, 0).open('GET', '/DATA/WAV/ACRO5.WAV');
    new DataRequest(3717332, 3735905, 0, 0).open('GET', '/DATA/WAV/PTR4.WAV');
    new DataRequest(3735905, 3762261, 0, 0).open('GET', '/DATA/WAV/ACRO2.WAV');
    new DataRequest(3762261, 3774195, 0, 0).open('GET', '/DATA/WAV/DIM1.WAV');
    new DataRequest(3774195, 3784759, 0, 0).open('GET', '/DATA/WAV/DIN3.WAV');
    new DataRequest(3784759, 3793713, 0, 0).open('GET', '/DATA/WAV/ACRO4.WAV');
    new DataRequest(3793713, 3805281, 0, 0).open('GET', '/DATA/WAV/DIN2.WAV');
    new DataRequest(3805281, 3819613, 0, 0).open('GET', '/DATA/WAV/FALL.WAV');
    new DataRequest(3819613, 3833650, 0, 0).open('GET', '/DATA/WAV/J_SWIM3.WAV');
    new DataRequest(3833650, 3834621, 0, 0).open('GET', '/DATA/WAV/J_BUL.WAV');
    new DataRequest(3834621, 3866217, 0, 0).open('GET', '/DATA/WAV/J_TELE.WAV');
    new DataRequest(3866217, 3878497, 0, 0).open('GET', '/DATA/WAV/BRU3.WAV');
    new DataRequest(3878497, 3880393, 0, 0).open('GET', '/DATA/WAV/J_HANG.WAV');
    new DataRequest(3880393, 3882289, 0, 0).open('GET', '/DATA/WAV/J_RUN.WAV');
    new DataRequest(3882289, 3900862, 0, 0).open('GET', '/DATA/WAV/PTR2.WAV');
    new DataRequest(3900862, 3902758, 0, 0).open('GET', '/DATA/WAV/EXTRA.WAV');
    new DataRequest(3902758, 3906764, 0, 0).open('GET', '/DATA/WAV/J_GUN.WAV');
    new DataRequest(3906764, 3918884, 0, 0).open('GET', '/DATA/WAV/MSTR2.WAV');
    new DataRequest(3918884, 3925627, 0, 0).open('GET', '/DATA/WAV/J_TURN1.WAV');
    new DataRequest(3925627, 3929297, 0, 0).open('GET', '/DATA/WAV/J_JUMP2.WAV');
    new DataRequest(3929297, 3951594, 0, 0).open('GET', '/DATA/WAV/ACRO1.WAV');
    new DataRequest(3951594, 3972502, 0, 0).open('GET', '/DATA/WAV/J_SHOOT.WAV');
    new DataRequest(3972502, 3974178, 0, 0).open('GET', '/DATA/WAV/J_2WALL.WAV');
    new DataRequest(3974178, 3988215, 0, 0).open('GET', '/DATA/WAV/WATER.WAV');
    new DataRequest(3988215, 4004405, 0, 0).open('GET', '/DATA/02/BOX.SPR');
    new DataRequest(4004405, 4005928, 0, 0).open('GET', '/DATA/02/GIRL.MOV');
    new DataRequest(4005928, 4006015, 0, 0).open('GET', '/DATA/02/VIEW.MOV');
    new DataRequest(4006015, 4006686, 0, 0).open('GET', '/DATA/02/BOX.MOV');
    new DataRequest(4006686, 4007365, 0, 0).open('GET', '/DATA/02/EXTRA.MOV');
    new DataRequest(4007365, 4076625, 0, 0).open('GET', '/DATA/02/EXTRA.SPR');
    new DataRequest(4076625, 4240669, 0, 0).open('GET', '/DATA/02/MONSTER.SPR');
    new DataRequest(4240669, 4240730, 0, 0).open('GET', '/DATA/02/SCR.MOV');
    new DataRequest(4240730, 4242186, 0, 0).open('GET', '/DATA/02/VIEW.SPR');
    new DataRequest(4242186, 4251924, 0, 0).open('GET', '/DATA/02/SCR.SPR');
    new DataRequest(4251924, 4259017, 0, 0).open('GET', '/DATA/02/MONSTER.MOV');
    new DataRequest(4259017, 4318757, 0, 0).open('GET', '/DATA/02/GIRL.SPR');
    new DataRequest(4318757, 4361503, 0, 0).open('GET', '/DATA/CAVE1/BAT.SPR');
    new DataRequest(4361503, 4366902, 0, 0).open('GET', '/DATA/CAVE1/GOL.MOV');
    new DataRequest(4366902, 4369909, 0, 0).open('GET', '/DATA/CAVE1/BAT1.MOV');
    new DataRequest(4369909, 4772773, 0, 0).open('GET', '/DATA/CAVE1/GOL.SPR');
    new DataRequest(4772773, 4774702, 0, 0).open('GET', '/DATA/16/EXTRA.MOV');
    new DataRequest(4774702, 4880582, 0, 0).open('GET', '/DATA/16/EXTRA.SPR');
    new DataRequest(4880582, 5016678, 0, 0).open('GET', '/DATA/16/BIRD.SPR');
    new DataRequest(5016678, 5035258, 0, 0).open('GET', '/DATA/16/BRIDGE.SPR');
    new DataRequest(5035258, 5038586, 0, 0).open('GET', '/DATA/16/BIRD.MOV');
    new DataRequest(5038586, 5041885, 0, 0).open('GET', '/DATA/16/BRIDGE.MOV');
    new DataRequest(5041885, 5242205, 0, 0).open('GET', '/DATA/22/FAR.SPR');
    new DataRequest(5242205, 5480345, 0, 0).open('GET', '/DATA/22/DIM.SPR');
    new DataRequest(5480345, 5480696, 0, 0).open('GET', '/DATA/22/FAR.MOV');
    new DataRequest(5480696, 5483341, 0, 0).open('GET', '/DATA/22/DIM.MOV');
    new DataRequest(5483341, 5485537, 0, 0).open('GET', '/DATA/24/PTR.MOV');
    new DataRequest(5485537, 5485626, 0, 0).open('GET', '/DATA/24/GIRL.MOV');
    new DataRequest(5485626, 6736440, 0, 0).open('GET', '/DATA/24/PTR.SPR');
    new DataRequest(6736440, 6736500, 0, 0).open('GET', '/DATA/24/SCR.MOV');
    new DataRequest(6736500, 6738398, 0, 0).open('GET', '/DATA/24/SCR.SPR');
    new DataRequest(6738398, 6755204, 0, 0).open('GET', '/DATA/24/GIRL.SPR');
    new DataRequest(6755204, 6755885, 0, 0).open('GET', '/DATA/00/SCR.MOV');
    new DataRequest(6755885, 6755927, 0, 0).open('GET', '/DATA/00/SCR.SPR');
    new DataRequest(6755927, 7343345, 0, 0).open('GET', '/DATA/04/CROC.SPR');
    new DataRequest(7343345, 7345751, 0, 0).open('GET', '/DATA/04/RAMFOR.MOV');
    new DataRequest(7345751, 7347409, 0, 0).open('GET', '/DATA/04/CROC.MOV');
    new DataRequest(7347409, 7347616, 0, 0).open('GET', '/DATA/04/WATER.MOV');
    new DataRequest(7347616, 7462450, 0, 0).open('GET', '/DATA/04/RAMFOR.SPR');
    new DataRequest(7462450, 7553128, 0, 0).open('GET', '/DATA/04/WATER.SPR');
    new DataRequest(7553128, 7770670, 0, 0).open('GET', '/DATA/WGP/-03.WGP');
    new DataRequest(7770670, 8078948, 0, 0).open('GET', '/DATA/WGP/TITLE3.BMP');
    new DataRequest(8078948, 8314330, 0, 0).open('GET', '/DATA/WGP/-08.WGP');
    new DataRequest(8314330, 8530672, 0, 0).open('GET', '/DATA/WGP/-01.WGP');
    new DataRequest(8530672, 8770726, 0, 0).open('GET', '/DATA/WGP/-25.WGP');
    new DataRequest(8770726, 9027228, 0, 0).open('GET', '/DATA/WGP/-26.WGP');
    new DataRequest(9027228, 9230242, 0, 0).open('GET', '/DATA/WGP/LAB01_02.WGP');
    new DataRequest(9230242, 9538520, 0, 0).open('GET', '/DATA/WGP/TITLE1.BMP');
    new DataRequest(9538520, 9717918, 0, 0).open('GET', '/DATA/WGP/LAB01_10.WGP');
    new DataRequest(9717918, 9930788, 0, 0).open('GET', '/DATA/WGP/-16.WGP');
    new DataRequest(9930788, 10116890, 0, 0).open('GET', '/DATA/WGP/-22.WGP');
    new DataRequest(10116890, 10316240, 0, 0).open('GET', '/DATA/WGP/-04.WGP');
    new DataRequest(10316240, 10539622, 0, 0).open('GET', '/DATA/WGP/LAB01_01.WGP');
    new DataRequest(10539622, 10705260, 0, 0).open('GET', '/DATA/WGP/LAB01_09.WGP');
    new DataRequest(10705260, 10921602, 0, 0).open('GET', '/DATA/WGP/-00.WGP');
    new DataRequest(10921602, 11174680, 0, 0).open('GET', '/DATA/WGP/-02.WGP');
    new DataRequest(11174680, 11396206, 0, 0).open('GET', '/DATA/WGP/-09.WGP');
    new DataRequest(11396206, 11704484, 0, 0).open('GET', '/DATA/WGP/TITLE2.BMP');
    new DataRequest(11704484, 11909434, 0, 0).open('GET', '/DATA/WGP/-07.WGP');
    new DataRequest(11909434, 12135168, 0, 0).open('GET', '/DATA/WGP/-24.WGP');
    new DataRequest(12135168, 12443446, 0, 0).open('GET', '/DATA/WGP/TITLE.BMP');
    new DataRequest(12443446, 12603804, 0, 0).open('GET', '/DATA/WGP/C1_12.WGP');
    new DataRequest(12603804, 12830146, 0, 0).open('GET', '/DATA/WGP/LAB01_08.WGP');
    new DataRequest(12830146, 13039352, 0, 0).open('GET', '/DATA/WGP/LAB01_11.WGP');
    new DataRequest(13039352, 13046527, 0, 0).open('GET', '/DATA/SCN/LAB02.SAV');
    new DataRequest(13046527, 13048686, 0, 0).open('GET', '/DATA/SCN/-26.SCN');
    new DataRequest(13048686, 13090926, 0, 0).open('GET', '/DATA/SCN/A09.KBR');
    new DataRequest(13090926, 13091179, 0, 0).open('GET', '/DATA/SCN/-00.SCN');
    new DataRequest(13091179, 13092730, 0, 0).open('GET', '/DATA/SCN/-24.SCN');
    new DataRequest(13092730, 13099481, 0, 0).open('GET', '/DATA/SCN/LAB06.SAV');
    new DataRequest(13099481, 13106338, 0, 0).open('GET', '/DATA/SCN/LAB05.SAV');
    new DataRequest(13106338, 13113616, 0, 0).open('GET', '/DATA/SCN/CAVE.SAV');
    new DataRequest(13113616, 13120468, 0, 0).open('GET', '/DATA/SCN/A08.SAV');
    new DataRequest(13120468, 13120696, 0, 0).open('GET', '/DATA/SCN/A02.SCN');
    new DataRequest(13120696, 13122048, 0, 0).open('GET', '/DATA/SCN/-16.SCN');
    new DataRequest(13122048, 13176576, 0, 0).open('GET', '/DATA/SCN/B08.KBR');
    new DataRequest(13176576, 13179613, 0, 0).open('GET', '/DATA/SCN/-03.SCN');
    new DataRequest(13179613, 13210845, 0, 0).open('GET', '/DATA/SCN/A22.KBR');
    new DataRequest(13210845, 13279325, 0, 0).open('GET', '/DATA/SCN/A26.KBR');
    new DataRequest(13279325, 13280318, 0, 0).open('GET', '/DATA/SCN/LAB01_09.SCN');
    new DataRequest(13280318, 13337022, 0, 0).open('GET', '/DATA/SCN/CAVE.KBR');
    new DataRequest(13337022, 13339050, 0, 0).open('GET', '/DATA/SCN/C1_12.SCN');
    new DataRequest(13339050, 13346432, 0, 0).open('GET', '/DATA/SCN/A26.SAV');
    new DataRequest(13346432, 13348062, 0, 0).open('GET', '/DATA/SCN/-22.SCN');
    new DataRequest(13348062, 13374174, 0, 0).open('GET', '/DATA/SCN/LAB06.KBR');
    new DataRequest(13374174, 13381029, 0, 0).open('GET', '/DATA/SCN/B08.SAV');
    new DataRequest(13381029, 13382816, 0, 0).open('GET', '/DATA/SCN/TELE02.SCN');
    new DataRequest(13382816, 13384621, 0, 0).open('GET', '/DATA/SCN/-25.SCN');
    new DataRequest(13384621, 13398573, 0, 0).open('GET', '/DATA/SCN/LAB05.KBR');
    new DataRequest(13398573, 13399899, 0, 0).open('GET', '/DATA/SCN/-02.SCN');
    new DataRequest(13399899, 13407455, 0, 0).open('GET', '/DATA/SCN/A22.SAV');
    new DataRequest(13407455, 13452383, 0, 0).open('GET', '/DATA/SCN/A24.KBR');
    new DataRequest(13452383, 13454137, 0, 0).open('GET', '/DATA/SCN/-08.SCN');
    new DataRequest(13454137, 13460676, 0, 0).open('GET', '/DATA/SCN/LAB03.SAV');
    new DataRequest(13460676, 13461352, 0, 0).open('GET', '/DATA/SCN/LAB01_08.SCN');
    new DataRequest(13461352, 13461580, 0, 0).open('GET', '/DATA/SCN/A01.SCN');
    new DataRequest(13461580, 13469290, 0, 0).open('GET', '/DATA/SCN/BERMUDA.WGP');
    new DataRequest(13469290, 13471378, 0, 0).open('GET', '/DATA/SCN/-01.SCN');
    new DataRequest(13471378, 13480140, 0, 0).open('GET', '/DATA/SCN/BERMUDA.SPR');
    new DataRequest(13480140, 13488014, 0, 0).open('GET', '/DATA/SCN/A25.SAV');
    new DataRequest(13488014, 13488242, 0, 0).open('GET', '/DATA/SCN/A03.SCN');
    new DataRequest(13488242, 13495586, 0, 0).open('GET', '/DATA/SCN/A24.SAV');
    new DataRequest(13495586, 13497332, 0, 0).open('GET', '/DATA/SCN/-04.SCN');
    new DataRequest(13497332, 13504081, 0, 0).open('GET', '/DATA/SCN/LAB01.SAV');
    new DataRequest(13504081, 13519825, 0, 0).open('GET', '/DATA/SCN/LAB01.KBR');
    new DataRequest(13519825, 13526465, 0, 0).open('GET', '/DATA/SCN/A09.SAV');
    new DataRequest(13526465, 13630017, 0, 0).open('GET', '/DATA/SCN/A25.KBR');
    new DataRequest(13630017, 13632252, 0, 0).open('GET', '/DATA/SCN/LAB01_02.SCN');
    new DataRequest(13632252, 13639109, 0, 0).open('GET', '/DATA/SCN/LAB04.SAV');
    new DataRequest(13639109, 13677253, 0, 0).open('GET', '/DATA/SCN/LAB04.KBR');
    new DataRequest(13677253, 13678201, 0, 0).open('GET', '/DATA/SCN/LAB01_10.SCN');
    new DataRequest(13678201, 13769209, 0, 0).open('GET', '/DATA/SCN/A16.KBR');
    new DataRequest(13769209, 13785465, 0, 0).open('GET', '/DATA/SCN/LAB03.KBR');
    new DataRequest(13785465, 13787733, 0, 0).open('GET', '/DATA/SCN/TELE01.SCN');
    new DataRequest(13787733, 13801813, 0, 0).open('GET', '/DATA/SCN/A08.KBR');
    new DataRequest(13801813, 13836501, 0, 0).open('GET', '/DATA/SCN/LAB02.KBR');
    new DataRequest(13836501, 13837724, 0, 0).open('GET', '/DATA/SCN/LAB01_11.SCN');
    new DataRequest(13837724, 13839537, 0, 0).open('GET', '/DATA/SCN/-09.SCN');
    new DataRequest(13839537, 13847237, 0, 0).open('GET', '/DATA/SCN/A16.SAV');
    new DataRequest(13847237, 13847500, 0, 0).open('GET', '/DATA/01/PRIEST.MOV');
    new DataRequest(13847500, 13848064, 0, 0).open('GET', '/DATA/01/KNIFE.SPR');
    new DataRequest(13848064, 13849249, 0, 0).open('GET', '/DATA/01/GIRL.MOV');
    new DataRequest(13849249, 13977555, 0, 0).open('GET', '/DATA/01/PRIEST.SPR');
    new DataRequest(13977555, 13977641, 0, 0).open('GET', '/DATA/01/VIEW.MOV');
    new DataRequest(13977641, 13978538, 0, 0).open('GET', '/DATA/01/EXTRA.MOV');
    new DataRequest(13978538, 14194664, 0, 0).open('GET', '/DATA/01/EXTRA.SPR');
    new DataRequest(14194664, 14196152, 0, 0).open('GET', '/DATA/01/VIEW.SPR');
    new DataRequest(14196152, 14196302, 0, 0).open('GET', '/DATA/01/PTER.MOV');
    new DataRequest(14196302, 14198180, 0, 0).open('GET', '/DATA/01/PTER.SPR');
    new DataRequest(14198180, 14342916, 0, 0).open('GET', '/DATA/01/GIRL.SPR');
    new DataRequest(14342916, 14410900, 0, 0).open('GET', '/DATA/MIDI/MUSIKA.MID');
    new DataRequest(14410900, 14430433, 0, 0).open('GET', '/DATA/MIDI/TITLE.MID');
    new DataRequest(14430433, 14531692, 0, 0).open('GET', '/DATA/MIDI/MUSIK.MID');
    new DataRequest(14531692, 14533366, 0, 0).open('GET', '/DATA/03/FOOD.SPR');
    new DataRequest(14533366, 14533662, 0, 0).open('GET', '/DATA/03/FOOD.MOV');
    new DataRequest(14533662, 16026100, 0, 0).open('GET', '/DATA/03/ACRO.SPR');
    new DataRequest(16026100, 16030633, 0, 0).open('GET', '/DATA/03/ACRO.MOV');
    new DataRequest(16030633, 16041651, 0, 0).open('GET', '/DATA/08/SCREEN.SPR');
    new DataRequest(16041651, 16041708, 0, 0).open('GET', '/DATA/08/VIEW.MOV');
    new DataRequest(16041708, 16988658, 0, 0).open('GET', '/DATA/08/ALS.SPR');
    new DataRequest(16988658, 16988723, 0, 0).open('GET', '/DATA/08/SCREEN.MOV');
    new DataRequest(16988723, 16989549, 0, 0).open('GET', '/DATA/08/VIEW.SPR');
    new DataRequest(16989549, 16990829, 0, 0).open('GET', '/DATA/08/LIFT.MOV');
    new DataRequest(16990829, 16994679, 0, 0).open('GET', '/DATA/08/LIFT.SPR');
    new DataRequest(16994679, 16999010, 0, 0).open('GET', '/DATA/08/ALS.MOV');
    new DataRequest(16999010, 17010516, 0, 0).open('GET', '/DATA/LAB02/WORM.SPR');
    new DataRequest(17010516, 17010746, 0, 0).open('GET', '/DATA/LAB02/FLY.MOV');
    new DataRequest(17010746, 17011062, 0, 0).open('GET', '/DATA/LAB02/WORM.MOV');
    new DataRequest(17011062, 17069302, 0, 0).open('GET', '/DATA/LAB02/FLY.SPR');
    new DataRequest(17069302, 17069699, 0, 0).open('GET', '/DATA/26/WAV.MOV');
    new DataRequest(17069699, 17069850, 0, 0).open('GET', '/DATA/26/VIEW.MOV');
    new DataRequest(17069850, 17074268, 0, 0).open('GET', '/DATA/26/FIRE.SPR');
    new DataRequest(17074268, 17074633, 0, 0).open('GET', '/DATA/26/IODA.MOV');
    new DataRequest(17074633, 17076093, 0, 0).open('GET', '/DATA/26/FIRE.MOV');
    new DataRequest(17076093, 17151115, 0, 0).open('GET', '/DATA/26/IODA.SPR');
    new DataRequest(17151115, 17297873, 0, 0).open('GET', '/DATA/26/WAV.SPR');
    new DataRequest(17297873, 17299687, 0, 0).open('GET', '/DATA/26/VIEW.SPR');
    new DataRequest(17299687, 17300731, 0, 0).open('GET', '/DATA/LAB01/WAT08.MOV');
    new DataRequest(17300731, 17748339, 0, 0).open('GET', '/DATA/LAB01/BLOCK.SPR');
    new DataRequest(17748339, 17748396, 0, 0).open('GET', '/DATA/LAB01/VIEW.MOV');
    new DataRequest(17748396, 17754305, 0, 0).open('GET', '/DATA/LAB01/BLOCK.MOV');
    new DataRequest(17754305, 17761851, 0, 0).open('GET', '/DATA/LAB01/LIFT11.SPR');
    new DataRequest(17761851, 17878113, 0, 0).open('GET', '/DATA/LAB01/WAT11.SPR');
    new DataRequest(17878113, 17881066, 0, 0).open('GET', '/DATA/LAB01/MKR.MOV');
    new DataRequest(17881066, 17947930, 0, 0).open('GET', '/DATA/LAB01/MKR.SPR');
    new DataRequest(17947930, 17948756, 0, 0).open('GET', '/DATA/LAB01/VIEW.SPR');
    new DataRequest(17948756, 17949800, 0, 0).open('GET', '/DATA/LAB01/WAT11.MOV');
    new DataRequest(17949800, 18071470, 0, 0).open('GET', '/DATA/LAB01/WAT08.SPR');
    new DataRequest(18071470, 18072383, 0, 0).open('GET', '/DATA/LAB01/LIFT11.MOV');
    new DataRequest(18072383, 20785699, 0, 1).open('GET', '/MUSIC/track03.ogg');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // Reuse the bytearray from the XHR as the source for file reads.
      DataRequest.prototype.byteArray = byteArray;
          DataRequest.prototype.requests["/DATA/1-CDROM.DAT"].onload();
          DataRequest.prototype.requests["/DATA/BERMUDA.WGP"].onload();
          DataRequest.prototype.requests["/DATA/BERMUDA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/WAV.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/LIANA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/RAFT.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/WAV.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/RAFT.MOV"].onload();
          DataRequest.prototype.requests["/DATA/25/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/LIANA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/25/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK_G.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK_G.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/FIRE.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/JACK/FIRE.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK.MOV"].onload();
          DataRequest.prototype.requests["/DATA/JACK/JACK.SPR"].onload();
          DataRequest.prototype.requests["/DATA/09/TOR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/09/TOR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/GIRL/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/GIRL/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/WAV/PTR1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/HOOK.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_UP.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/CROC.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BIRD3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BRU1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/RAM2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/MSTR1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/CUT.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/MSTR3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/RAM1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BIRD2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_GUN1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BIRD1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_KNIF1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TURN3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_KNIF2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_GUN2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_SWIM2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/MSTR4.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STOP.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STEPG.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/KICK2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BOX.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIN1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/LIANA.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIM3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TURN2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_JUMP1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_SWIM1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/MOKR.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/LIFT.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIM2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STOP1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/RAM3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_STEPW.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIN4.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/KICK1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_FALL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BRU2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/PTR3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO5.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/PTR4.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIM1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIN3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO4.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/DIN2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/FALL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_SWIM3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_BUL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TELE.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/BRU3.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_HANG.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_RUN.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/PTR2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/EXTRA.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_GUN.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/MSTR2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_TURN1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_JUMP2.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/ACRO1.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_SHOOT.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/J_2WALL.WAV"].onload();
          DataRequest.prototype.requests["/DATA/WAV/WATER.WAV"].onload();
          DataRequest.prototype.requests["/DATA/02/BOX.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/BOX.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/MONSTER.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/SCR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/SCR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/02/MONSTER.MOV"].onload();
          DataRequest.prototype.requests["/DATA/02/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/CAVE1/BAT.SPR"].onload();
          DataRequest.prototype.requests["/DATA/CAVE1/GOL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/CAVE1/BAT1.MOV"].onload();
          DataRequest.prototype.requests["/DATA/CAVE1/GOL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/16/EXTRA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/16/EXTRA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/16/BIRD.SPR"].onload();
          DataRequest.prototype.requests["/DATA/16/BRIDGE.SPR"].onload();
          DataRequest.prototype.requests["/DATA/16/BIRD.MOV"].onload();
          DataRequest.prototype.requests["/DATA/16/BRIDGE.MOV"].onload();
          DataRequest.prototype.requests["/DATA/22/FAR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/22/DIM.SPR"].onload();
          DataRequest.prototype.requests["/DATA/22/FAR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/22/DIM.MOV"].onload();
          DataRequest.prototype.requests["/DATA/24/PTR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/24/GIRL.MOV"].onload();
          DataRequest.prototype.requests["/DATA/24/PTR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/24/SCR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/24/SCR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/24/GIRL.SPR"].onload();
          DataRequest.prototype.requests["/DATA/00/SCR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/00/SCR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/04/CROC.SPR"].onload();
          DataRequest.prototype.requests["/DATA/04/RAMFOR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/CROC.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/WATER.MOV"].onload();
          DataRequest.prototype.requests["/DATA/04/RAMFOR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/04/WATER.SPR"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-03.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE3.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-08.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-01.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-25.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-26.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_02.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE1.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_10.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-16.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-22.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-04.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_01.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_09.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-00.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-02.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-09.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE2.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-07.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/-24.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/TITLE.BMP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/C1_12.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_08.WGP"].onload();
          DataRequest.prototype.requests["/DATA/WGP/LAB01_11.WGP"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB02.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-26.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A09.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-00.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-24.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB06.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB05.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/CAVE.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A08.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A02.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-16.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/B08.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-03.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A22.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A26.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01_09.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/CAVE.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/C1_12.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A26.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-22.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB06.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/B08.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/TELE02.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-25.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB05.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-02.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A22.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A24.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-08.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB03.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01_08.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A01.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/BERMUDA.WGP"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-01.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/BERMUDA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A25.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A03.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A24.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-04.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A09.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A25.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01_02.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB04.SAV"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB04.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01_10.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A16.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB03.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/TELE01.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A08.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB02.KBR"].onload();
          DataRequest.prototype.requests["/DATA/SCN/LAB01_11.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/-09.SCN"].onload();
          DataRequest.prototype.requests["/DATA/SCN/A16.SAV"].onload();
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
          DataRequest.prototype.requests["/DATA/MIDI/MUSIKA.MID"].onload();
          DataRequest.prototype.requests["/DATA/MIDI/TITLE.MID"].onload();
          DataRequest.prototype.requests["/DATA/MIDI/MUSIK.MID"].onload();
          DataRequest.prototype.requests["/DATA/03/FOOD.SPR"].onload();
          DataRequest.prototype.requests["/DATA/03/FOOD.MOV"].onload();
          DataRequest.prototype.requests["/DATA/03/ACRO.SPR"].onload();
          DataRequest.prototype.requests["/DATA/03/ACRO.MOV"].onload();
          DataRequest.prototype.requests["/DATA/08/SCREEN.SPR"].onload();
          DataRequest.prototype.requests["/DATA/08/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/08/ALS.SPR"].onload();
          DataRequest.prototype.requests["/DATA/08/SCREEN.MOV"].onload();
          DataRequest.prototype.requests["/DATA/08/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/08/LIFT.MOV"].onload();
          DataRequest.prototype.requests["/DATA/08/LIFT.SPR"].onload();
          DataRequest.prototype.requests["/DATA/08/ALS.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB02/WORM.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB02/FLY.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB02/WORM.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB02/FLY.SPR"].onload();
          DataRequest.prototype.requests["/DATA/26/WAV.MOV"].onload();
          DataRequest.prototype.requests["/DATA/26/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/26/FIRE.SPR"].onload();
          DataRequest.prototype.requests["/DATA/26/IODA.MOV"].onload();
          DataRequest.prototype.requests["/DATA/26/FIRE.MOV"].onload();
          DataRequest.prototype.requests["/DATA/26/IODA.SPR"].onload();
          DataRequest.prototype.requests["/DATA/26/WAV.SPR"].onload();
          DataRequest.prototype.requests["/DATA/26/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/WAT08.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/BLOCK.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/VIEW.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/BLOCK.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/LIFT11.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/WAT11.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/MKR.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/MKR.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/VIEW.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/WAT11.MOV"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/WAT08.SPR"].onload();
          DataRequest.prototype.requests["/DATA/LAB01/LIFT11.MOV"].onload();
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

