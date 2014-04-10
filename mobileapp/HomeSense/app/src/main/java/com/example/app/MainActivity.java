package com.example.app;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
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
import android.widget.EditText;
import android.widget.Toast;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainActivity extends ActionBarActivity {

    public final static String LOGIN_URL = "homesense.herokuapp.com/api/login";
    public final static String TOKEN_MESSAGE = "theToken";

    public String TOKEN = "fuck";
    //public List<Map<String, String>> TOKEN = null;
    public String email = null;
    public String pw = null;

    //for testing
    private HashMap<String, String> newSensor(String key, String name){
        HashMap<String,String> sensor = new HashMap<String, String>();
        sensor.put(key, name);

        return sensor;
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


    /*Called for login attempt*//*
    public void loginMessage(View view){
        Intent intent = new Intent(this, HomeScreen.class);
        EditText eTEmail = (EditText) findViewById(R.id.editTextEmail);
        EditText eTPW = (EditText) findViewById(R.id.editTextPassword);
        String messageEmail = eTEmail.getText().toString();
        String messagePW = eTPW.getText().toString();
        Bundle bundleLogin = new Bundle();
        bundleLogin.putString("email",messageEmail);
        bundleLogin.putString("pw", messagePW);
        startActivity(intent);
    }*/

    public void lostPWMessage(View view){
        Intent intent = new Intent(this, PWRec.class);
        startActivity(intent);
    }

    public void doLogin(View view) {
        email = ((EditText) findViewById(R.id.editTextEmail))
                .getText().toString();
        pw = ((EditText) findViewById(R.id.editTextPassword))
                .getText().toString();
        //Toast.makeText(this, "doLogin called",
          //      Toast.LENGTH_SHORT).show();
        new  Login(this).execute();

        Toast.makeText(this, "Errors Found:  " + TOKEN,
                Toast.LENGTH_SHORT).show();

        /*if (TOKEN != null) {
            Intent intent = new Intent(this, HomeScreen.class);
            intent.putExtra(TOKEN_MESSAGE, TOKEN);
            startActivity(intent);
        }*/
    }

    private class Login extends AsyncTask<Void, Void, Void> {

        private Context context;

        public Login(Context context){
            this.context = context;
        }

        //check Internet connection.
        private void checkInternetConnection(){
            ConnectivityManager check = (ConnectivityManager) this.context.
                    getSystemService(Context.CONNECTIVITY_SERVICE);
            if (check != null){
                NetworkInfo[] info = check.getAllNetworkInfo();
                if (info != null)
                    for (int i=0; i<info.length; i++)
                        if (info[i].getState() == NetworkInfo.State.CONNECTED){
                            Toast.makeText(context, "Internet is connected",
                                    Toast.LENGTH_SHORT).show();
                        }
            }
            else{
                Toast.makeText(context, "not connected to internet",
                        Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        protected void onPreExecute(){
            checkInternetConnection();
        }

        @Override
        protected Void doInBackground(Void... arg0 ){


            List<NameValuePair> userInfo = new ArrayList<NameValuePair>();

            String loginJson = "{ email: '" + email + "', password: '" + pw + " }";

            userInfo.add(new BasicNameValuePair("theString", loginJson));

            //BasicNameValuePair userInfo = new BasicNameValuePair("theString", loginJson);

            ServiceHandler sh = new ServiceHandler();

            String jsonString = sh.makeServiceCall(LOGIN_URL, sh.POST, userInfo );

            TOKEN = "Shit";

            try{
                JSONObject json = new JSONObject(jsonString);
                String hasErrors = json.getString("hasErrors");
                TOKEN = hasErrors;
            }catch (JSONException e){
                e.printStackTrace();
            }



            //jsonToken="dummy";
            //Once schema for response to login is available, parse JSON to get token
            //TOKEN = jsonToken; //set value for token

            return null;

            /*try{

                URL url = new URL(LOGIN_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);
                conn.setRequestMethod("GET");
                conn.setDoInput(true);
                conn.connect();
                InputStream is = conn.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(is, "Utf-8"));
                String data = null;
                String webPage = "";
                while ((data = reader.readLine()) != null){
                    webPage += data + "\n";
                }

                //for testing
                /*ArrayList<Map<String, String>> sensorsList = new ArrayList<Map<String, String>>();

                sensorsList.add(newSensor("sensor", "Temperature 1"));
                sensorsList.add(newSensor("sensor", "Motion 1"));
                sensorsList.add(newSensor("sensor", "Light 1"));
*/
/*

                TOKEN = webPage;
                return null;
            }catch (Exception e){
                //TOKEN = new String("Exception: " + e.getMessage());
                return null;
            }*/
        }
    }

}
