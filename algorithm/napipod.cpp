#include "napipod.h"

Napi::FunctionReference NapiPod::constructor;

Napi::Object NapiPod::Init(Napi::Env env, Napi::Object exports)
{
      Napi::HandleScope scope(env);

      Napi::Function func = DefineClass(env, "NapiPod", {
        InstanceMethod("photoCheck", &NapiPod::photoCheck)
      });

      constructor = Napi::Persistent(func);
      constructor.SuppressDestruct();

      exports.Set("NapiPod", func);
      return exports;
}

NapiPod::NapiPod(const Napi::CallbackInfo& info) : Napi::ObjectWrap<NapiPod>(info)
{
      Napi::Env env = info.Env();
      Napi::HandleScope scope(env);

      //Napi::String filePath = info[0].As<Napi::String>();
      this->bibVecher_ = new BibVecher();
}

Napi::Value NapiPod::photoCheck(const Napi::CallbackInfo& info)
{
      Napi::Env env = info.Env();
      Napi::HandleScope scope(env);

      //bool answer = true;
      Napi::String filePath1 = info[0].As<Napi::String>();
      string filePath = filePath1.Utf8Value();

      Napi::String startTime1 = info[1].As<Napi::String>();
      string startTime = startTime1.Utf8Value();

      Napi::String gpsW1 = info[2].As<Napi::String>();
      string gpsW = gpsW1.Utf8Value();

      Napi::String gpsL1 = info[3].As<Napi::String>();
      string gpsL = gpsL1.Utf8Value();

      Napi::String photoTime1 = info[4].As<Napi::String>();
      string photoTime = photoTime1.Utf8Value();

      double answer = this->bibVecher_->photoCheck(filePath, startTime, gpsW, gpsL, photoTime);
      return Napi::Number::New(env, answer);

//      double answer = this->bibVecher_->photoCheck(filePath, startTime, gpsW, gpsL, photoTime);
//      return Napi::Boolean::New(env, answer);
}

BibVecher* NapiPod::GetInternalInstance()
{
    return this->bibVecher_;
}

