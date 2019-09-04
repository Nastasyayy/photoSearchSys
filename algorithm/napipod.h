#ifndef NAPIPOD
#define NAPIPOD
#include <napi.h>
#include "pod.h"

class NapiPod : public Napi::ObjectWrap<NapiPod>{
    public:
      static Napi::Object Init(Napi::Env env, Napi::Object exports);
      NapiPod(const Napi::CallbackInfo& info);
      BibVecher* GetInternalInstance();
    private:
      static Napi::FunctionReference constructor;
      Napi::Value photoCheck(const Napi::CallbackInfo& info);
      BibVecher *bibVecher_;
};

#endif // NAPIPOD

