// broker
var btnConnect = document.getElementById('connect');
var btnDisConnect = document.getElementById('disconnect');
var broker = document.getElementById('broker');
var btnStatus = document.getElementById('status');

//Publish
var btnPublish = document.getElementById('btn-publish');
var pubTopic = document.getElementById('Topic');
var pubPayload = document.getElementById('Payload');

//Subscribe
var subTopic = document.getElementById('subTopic');
var btnSubscribe = document.getElementById('btn-Subscribe');
var btnUnsubscribe = document.getElementById('btn-Unsubscribe');



btnConnect.addEventListener('click', function (e){
  e.preventDefault();

  //client
  var client = mqtt.connect(broker.value)
  // client.subscribe("mqtt/demox")

  btnSubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Subscribe { topic: " + document.getElementById('subTopic').value + " }");
    client.subscribe("" + subTopic.value);

    let tbl = document.getElementById('subscriber');
    let tbody = document.getElementById('submsg');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(subTopic.value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);

    // btnUnsubscribe.disabled = false;
    // btnSubscribe.disabled = true;
  })

  btnUnsubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    client.unsubscribe("" + subTopic.value);
    // btnUnsubscribe.disabled = true;
    // btnSubscribe.disabled = false;
    console.log("Unsubscribe to mqtt/" + subTopic.value)
  })

  client.on("connect", function () {
    console.log("Successfully connected");
    btnStatus.disabled = false;
    btnDisConnect.disabled = false;
    btnConnect.disabled = true;
    btnStatus.setAttribute('value', 'Successfully Connected!')
    btnStatus.setAttribute('class', 'btn btn-success')
  });


  //btnDisconnect
  btnDisConnect.addEventListener('click', function () {
    client.end();
    btnStatus.disabled = true;
    btnDisConnect.disabled = true;
    btnConnect.disabled = false;
    console.log('Disconnected');
    btnStatus.setAttribute('value', 'Successfully Disconnected!')
    btnStatus.setAttribute('class', 'btn btn-warning')
  });


  client.on("message", function (topic, payload) {
    // let finalTopic = topic.slice(5);
    console.log([topic, payload].join(": "));
    console.log("Received { topic: " + topic + "; payload: " + payload + " }");
  //   console.log("Published { topic: " + document.getElementById('pubTopic').value
  // + "; payload: " + document.getElementById('pubPayload').value + " }");
    let tbl = document.getElementById('receiver');
    let tbody = document.getElementById('msg');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(topic));
    msgPayload.appendChild(document.createTextNode(payload));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    // $('.broker tbody').append("<tr><td>" + finalTopic + "</td><td>" + payload + "</td><td>" + moment().format('llll') + "</td></tr>");

  })

  // client.publish("mqtt/demox", "hello world!")

  btnPublish.addEventListener('click', function (e) {
    e.preventDefault();
    client.publish("" + pubTopic.value, pubPayload.value);
    console.log("Publish { topic: "+pubTopic.value+"; payload: "+ pubPayload.value+" }");
    let tbl = document.getElementById('publisher');
    let tbody = document.getElementById('pubmsg');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(pubTopic.value));
    msgPayload.appendChild(document.createTextNode(pubPayload.value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
  })
  //   console.log("Published { topic: " + document.getElementById('pubTopic').value
  // + "; payload: " + document.getElementById('pubPayload').value + " }");




  // console.log("connect button clicked")
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  // client.subscribe("mqtt/demo")
  
  // client.on("connect", function(){
  //   document.getElementById("Stat").innerHTML += '<span>Connected!</span><br/>';  })
  
  //   client.on("message", function (topic, payload) {
  //     console.log([topic, payload].join(": "));
  //     //client.end();
  // })


  // btnSubscribe.addEventListener('click', function(e){    
  // })

  // btnPublish.addEventListener('click', function(e){
  //   e.preventDefault();
  //   var top1 = $("input[name='topic']").val();
  //   var payload1 = $("input[name='payload']").val();
  //   client.publish("mqtt/demo",document.getElementsByClassName("table2").innerHTML +=  $(".data-table tbody").append("<tr   data-topic='"+top1+"' data-payload='"+payload1+"'><td>"+top1+"</td><td>"+payload1+" </td><td>"+''+"</td></tr>")
  //   )
  //   $("input[name='top1']").val('');
  //   $("input[name='payload1']").val('');
  })
