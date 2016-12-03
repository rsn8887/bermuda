
#include <SDL.h>
#include <SDL_mixer.h>
#include "file.h"
#include "mixer.h"
#include "util.h"

struct MixerSDL: Mixer {

	static const int kMixFreq = 22050;
	static const int kMixBufSize = 4096;
	static const int kChannels = 4;

	bool _isOpen;
	Mix_Chunk *_chunk;
	Mix_Music *_music;
	uint8_t *_musicBuf;

	MixerSDL()
		: _isOpen(false), _music(0), _musicBuf(0) {
	}

	virtual ~MixerSDL() {
	}

	virtual void open() {
		if (_isOpen) {
			return;
		}
		Mix_Init(MIX_INIT_OGG | MIX_INIT_FLUIDSYNTH);
		if (Mix_OpenAudio(kMixFreq, AUDIO_S16SYS, 2, kMixBufSize) < 0) {
			warning("Mix_OpenAudio failed: %s", Mix_GetError());
		}
		Mix_AllocateChannels(kChannels);
		Mix_VolumeMusic(MIX_MAX_VOLUME / 2);
		_isOpen = true;
	}
	virtual void close() {
		if (!_isOpen) {
			return;
		}
		stopAll();
		Mix_CloseAudio();
		Mix_Quit();
		_isOpen = false;
	}

	virtual void playSound(File *f, int *id) {
		debug(DBG_MIXER, "MixerSDL::playSound() path '%s'", f->_path);
		if (_chunk) {
			Mix_FreeChunk(_chunk);
			_chunk = 0;
		}
		_chunk = Mix_LoadWAV(f->_path);
		if (_chunk) {
			*id = Mix_PlayChannel(-1, _chunk, 0);
		} else {
			*id = -1;
		}
	}
	virtual void playMusic(File *f, int *id) {
		debug(DBG_MIXER, "MixerSDL::playSoundMusic() path '%s'", f->_path);
		stopMusic();
		const char *ext = strrchr(f->_path, '.');
		if (ext) {
			if (strcasecmp(ext, ".ogg") != 0 && strcasecmp(ext, ".mid") != 0) {
				loadMusic(f);
				*id = -1;
				return;
			}
		}
		playMusic(f->_path);
		*id = -1;
	}
	virtual bool isSoundPlaying(int id) {
		return Mix_Playing(id) != 0;
	}
	virtual void stopSound(int id) {
		debug(DBG_MIXER, "MixerSDL::stopSound()");
		Mix_HaltChannel(id);
		if (_chunk) {
			Mix_FreeChunk(_chunk);
			_chunk = 0;
		}
	}

	void loadMusic(File *f) {
		_musicBuf = (uint8_t *)malloc(f->size());
		if (_musicBuf) {
			const int size = f->read(_musicBuf, f->size());
			SDL_RWops *rw = SDL_RWFromConstMem(_musicBuf, size);
			if (rw) {
				_music = Mix_LoadMUSType_RW(rw, MUS_MID, 1);
				if (_music) {
					Mix_PlayMusic(_music, 0);
				} else {
					warning("Failed to load music, %s", Mix_GetError());
				}
			}
		}
	}

	void playMusic(const char *path) {
		_music = Mix_LoadMUS(path);
		if (_music) {
			Mix_PlayMusic(_music, 0);
		} else {
			warning("Failed to load music '%s', %s", path, Mix_GetError());
		}
	}
	void stopMusic() {
		Mix_HaltMusic();
		if (_music) {
			Mix_FreeMusic(_music);
			_music = 0;
		}
		if (_musicBuf) {
			free(_musicBuf);
			_musicBuf = 0;
		}
	}
	virtual void setMusicMix(void *param, void (*mix)(void *, uint8_t *, int)) {
#ifndef __EMSCRIPTEN__
		if (mix) {
			Mix_HookMusic(mix, param);
		} else {
			Mix_HookMusic(0, 0);
		}
#endif
	}

	virtual void stopAll() {
		debug(DBG_MIXER, "MixerSDL::stopAll()");
		stopSound(-1);
		stopMusic();
	}
};

Mixer *Mixer_SDL_create(SystemStub *stub) {
	return new MixerSDL();
}
