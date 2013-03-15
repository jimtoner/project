package com.example.hellhtml5;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/helloSpreatsheet.html");
    }
}
