#ifndef Connection_H
#define Connection_H

#include <ESP8266WiFi.h>

namespace Connection {

    /* HTTPS CLIENT */
    class HttpsClient {
    public:
        void setHost(String host = "https://example.com");
        String get(String path="/endpoint/of/url");
    private:
        String host = "";
        const int Port = 443;
    };

     /* HTTP CLIENT */
    class HttpClient {
    public:
        void setHost(String host = "http://example.com");
        void setPort(int port = 80);
        String get(String path="/endpoint/of/url");
    private:
        String host = "";
        int Port = 80;
    };

    /* STATIC WIFI CLASS */
    class WiFi {
    public:
        static void connect(String SSID, String Password);
    };
};

#endif
