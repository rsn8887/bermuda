Compiling:
----------

You need:
- Official Sony PS3 SDK: google for it
- This unofficial port of libSDL: https://github.com/usineur/sdcell
- PSL1GHT SDK: https://github.com/ps3dev/PSL1GHT
- SDL_mixer: http://hg.libsdl.org/SDL_mixer/ (on a 1.2 branch)

Run `make -f Makefile.ps3`.


Data Files:
-----------

- The engine will try to load the game data files from `/dev_hdd0/game/BERMUDA00/DATA` directory.
- The savestates will be saved in `/dev_hdd0/game/BERMUDA00/SAVES` directory.
- Midi musics can be converted to Ogg Vorbis and placed in the `/dev_hdd0/game/BERMUDA00/MUSIC` directory.


Controls:
---------

###Here are the various in-game hotkeys :
| Keys       |                                        |
| ---------- | -------------------------------------- |
| Arrow Keys | Move Jack                              |
| Cross      | Interact / Skip dialogues or cutscenes |
| Square     | Use weapon / Pull out weapon           |
| Circle     | Run / Put away weapon                  |
| Triangle   | Display bag                            |
| Start      | Display status bar                     |
| R1         | Save game state                        |
| L1         | Load game state                        |
| R2/L2      | Increase/decrease game state slot      |


Credits:
--------

Cyx (Grégory Montoir) for original reverse work and modern engine.
