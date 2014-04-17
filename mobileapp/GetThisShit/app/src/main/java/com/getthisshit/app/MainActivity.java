package com.getthisshit.app;

import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.os.Build;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends ActionBarActivity {

    TextView text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        text = (TextView) findViewById(R.id.text);

    }

    public void Go(View view){
        connect doit = new connect(this);
        doit.execute();
    }

    private class connect extends AsyncTask<Void, Void, String>{

        private Context context;

        public connect(Context context){
            this.context = context;
        }

        @Override
        protected String doInBackground(Void... arg0){


            List<NameValuePair> userInfo = new ArrayList<NameValuePair>(2);
            String URL = "http://httpbin.org/post";
            String response = "no response";

            HttpClient httpClient = new DefaultHttpClient();
            HttpEntity httpEntity = null;
            HttpResponse httpResponse = null;
            HttpPost httpPost = new HttpPost(URL);

            userInfo.add(new BasicNameValuePair("email", "bad@motherfucker.com"));
            userInfo.add(new BasicNameValuePair("password", "SayWhatAgain"));

            try{
                httpPost.setEntity(new UrlEncodedFormEntity(userInfo));
                httpResponse = httpClient.execute(httpPost);
               /* httpEntity = httpResponse.getEntity();
                response = EntityUtils.toString(httpEntity);*/
                response = "fuck";
                return response;
            } catch (UnsupportedEncodingException e){
                e.printStackTrace();
            } catch (ClientProtocolException e){
                e.printStackTrace();
            } catch (IOException e) {
                 e.printStackTrace();
            } catch (IllegalStateException e) {
                e.printStackTrace();
            }

            return "damn";

        }

        @Override
        protected void onPostExecute(String response){
            //Toast.makeText(context , response, Toast.LENGTH_SHORT).show();
            text.setText(response);
        }
    }

}
