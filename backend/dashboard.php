<?php
$m = new MongoClient("mongodb://localhost:10210");
$db = $m->selectDB("antiscrap");

$collection = $db->summary;

$cursor = $collection->find(array('request'=> array('$gt'=>3)));

// iterate through the results
foreach ($cursor as $document) {
    $result = $document["score"] / ($document["request"] * 3);
    if ($_GET['debug']!='all'){
    if ($result > 0.65){
	if (isset($_GET['debug']))
	    echo 'deny ' . $document["host"]." request: ". $document["request"] ." score: ". $document["score"]." result: ".$result . "\n";
	else
    	    echo  'deny ' . $document["host"].";\n";
    }
    }else
	    echo 'deny ' . $document["host"]." request: ". $document["request"] ." score: ". $document["score"]." result: ".$result . "\n";
}
?>
