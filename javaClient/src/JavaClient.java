import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.Scanner;

/**
 * Created by Howard on 3/26/2016.
 */
public class JavaClient{
    public static void main(String[] args) throws URISyntaxException, JSONException {
        int port = 8000;
        String IP = "167.96.79.221";
        Socket socket = IO.socket("http://" + IP + ":" + port);
        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println("connected");
            }

        }).on("JSONPayload", new Emitter.Listener() {
            /*
              It is a good practice to only take action when server reboardcast your message
              because it act as a way for the server to confirm that it received your message.
              Otherwise client and server can become out of sync.
            */
            @Override
            public void call(Object... args) {
                if(args.length > 0){
                    JSONObject data = (JSONObject)args[0];
                    Iterator<String> iter = data.keys();
                    System.out.print("received data : ");
                    while(iter.hasNext()){
                        try {
                            System.out.print(data.get(iter.next()));
                        } catch (JSONException e) {
                            System.out.println("JSON parse failed \n" + args[0]);
                        }
                    }
                    System.out.println();
                }
            }

        }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {}

        });
        socket.connect();

        /*
        Mock message client
         */
        String input = "";
        boolean stopFlag = true;
        Scanner scanner = new Scanner(System.in);
        while(stopFlag){
            input = scanner.nextLine();
            if(input.toLowerCase().equals("stop")){
                socket.disconnect();
                stopFlag = false;
            }
            else{
                JSONObject obj = new JSONObject();
                obj.append("message", input);
                socket.emit("JSONPayload", obj);
            }
        }
    }
}
