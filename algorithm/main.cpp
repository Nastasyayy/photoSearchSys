#include <napi.h>
#include "napipod.h" //Test

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return NapiPod::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
