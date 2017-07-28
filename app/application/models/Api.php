<?php
/**
 * esta clase contiene los metodos de acceso a un api rest,
 * para usarla: }
 *  $api_helper = Application_Model_Api::getInstance();
 *  $api_helper-> get("endpointurl?param" || "endpointurl/param" ) 
 *  $api_helper-> post("endpointurl", data)
 *  $api_helper-> put ("endpointurl/param" || "endpointurl?param", data)
 *  $api_helper-> delete("endpointurl?param" || "endpointurl/param" )  
 *
 * hecho por pedro garcia.
 * :D .-. 
 */
class Application_Model_Api
{


    private  $_client;
    private static $instance;
    private $_url;
    private function __construct()
    {


        /**
         * se lee la direccion del api  el nombre de usuario y contraseña desde el archivo .config.json,
         * @var Zend_Config_Json
         */
        $configApi = new Zend_Config_Json(
            APPLICATION_PATH . '/configs/.config.json',
            APPLICATION_ENV
        );
        $this->_client = new Zend_Http_Client();
        $this->_url  = $configApi->API_URL;
        $this->_client->setHeaders(array('Accept: */*','Content-type: appliction/json'));
        $this->_client->setAuth($configApi->AUTHORIZATION->USERNAME,$configApi->AUTHORIZATION->TOKEN);
    }
     
     /**
      * singleton instance
      */
    public static function getInstance()
    {
      if (!self::$instance instanceof self)
      {
       self::$instance = new self;
       }
       return self::$instance;
    }
    public function __clone()
    {
      trigger_error("Operación Invalida: No puedes clonar una instancia de ". get_class($this)." class.", E_USER_ERROR );
      }
    public function __wakeup()
    {
      trigger_error("No puedes deserializar una instancia de ". get_class($this) ." class.");
    }

/**
 *  realiza la peticion get retorna el objeto json
 */
    public function get( $uri ){
        $uri = (string)$uri;
        $uri = $this->_url.$uri;
        $this->_client->setUri($uri);
        $this->_client->setMethod(Zend_Http_Client::GET);
        return json_decode($this->_client->request()->getBody(),true);
    }

    /**
 *  realiza la peticion pos retorna el objeto json
 */
    public function post( $uri, $data){
        $uri = (string)$uri;
        $uri = $this->_url.$uri;
        $data =  json_encode($data, JSON_FORCE_OBJECT);
        $this->_client->setUri($uri);
        $this->_client->setMethod(Zend_Http_Client::POST);
        $this->_client->setRawData($data);
        return json_decode($this->_client->request()->getBody(),true);
    }
    /**
 *  realiza la peticion put retorna el objeto json
 */
    public function put( $uri, $data){
        $uri = (string)$uri;
        $uri = $this->_url.$uri;
        $data =  json_encode($data, JSON_FORCE_OBJECT);
       $this->_client->setUri($uri);
        $this->_client->setMethod(Zend_Http_Client::PUT);
        $this->_client->setRawData($data);
        return json_decode($this->_client->request()->getBody(),true);
    }   
    /**
 *  realiza la peticion delete retorna el objeto json
 */
    public function delete( $uri){
        $uri = (string)$uri;
        $uri = $this->_url.$uri;
       $this->_client->setUri($uri);
        $this->_client->setMethod(Zend_Http_Client::DELETE);
        return json_decode($this->_client->request()->getBody(),true);
    
    }
}
