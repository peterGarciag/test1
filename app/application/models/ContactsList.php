<?php

class Application_Model_ContactsList
{

    private $_api;
    public function __construct()
    {
        $this->_api = Application_Model_Api::getInstance();
    }

  public function fetchAll($limit = 30 , $start = 0,$type = ""){
        if ($limit > 30) {
          $limit = 30;
        }
       $uri = "contacts/?limit=".$limit."&metadata=true&start=".$start;
       if ($type != '') {
         $uri = $uri."&type=".$type;
       }
       $res = $this->_api->get($uri);
       return $res;
    }
    public function fetchAllSellers(){
       
       $uri = "sellers/";
       $res = $this->_api->get($uri);
       return $res;
    }
      public function fetchAllTerm($limit = 30 , $start = 0,$type = ""){
          return '[{"id" : 1 , "name": "De contado"},{"id" : 2 , "name": "8 Días"},{"id" : 3 , "name": "15 Días"},{"id" : 5 , "name": "30 Días"},{"id" : 6 , "name": "60 Días"}]';

      }

    public function fetchAllPriceList($limit = 30 , $start = 0,$type = ""){
       $uri = "price-lists/";
       $res = $this->_api->get($uri);
       return $res;
    }
    public function fetchById( $id){

       $uri = "contacts/:".$id;
       $res = $this->_api->get($uri);
       return $res;
    }

    public function editContact( $contact){

       $uri = "contacts/:".$contact['id'];
       $res = $this->_api->put($uri,$contact);
       return $res;
    }

    public function newContact( $contact){

       $uri = "contacts/";
       $res = $this->_api->post($uri,$contact);
       return $res;
    }

    public function deleteContact( $id){
       $uri = "contacts/".$id;
       $res = $this->_api->delete($uri);
       return $res;
    }

}

