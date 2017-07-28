<?php

class IndexController extends Zend_Controller_Action
{

    protected $List = null;

    public function init()
    {
        $this->List = new Application_Model_ContactsList();
          $this->_helper->contextSwitch()
            ->addActionContext('get', array('xml', 'json'))
            ->addActionContext('add', array('xml', 'json'))
            ->addActionContext('edit', array('xml', 'json'))
            ->addActionContext('delete', array('xml', 'json'))
            ->addActionContext('get-seller', array('xml', 'json'))
            ->addActionContext('get-term', array('xml', 'json'))
            ->addActionContext('get-price-list', array('xml', 'json'))
            ->setAutoJsonSerialization(true)
            ->initContext();
    }

    public function indexAction()
    {
    

    }

    public function addAction()
    {
         $rq = json_decode($this->getRequest()->getRawBody(),true);
        $res = $this->List->newContact($rq);
       // $this->view->success = $res;
        $this->view->success = $res;
    }

    public function editAction()
    {
       $rq = json_decode($this->getRequest()->getRawBody(),true);
       
       
        $res = $this->List->editContact($rq);
       // $this->view->success = $res;
        $this->view->success = !(isset($res["code"]));
    }

    public function deleteAction()
    {
       $rq = json_decode($this->getRequest()->getRawBody(),true);
       // Zend_Debug::dump($rq["id"], $label = null, $echo = true);
       $this->view->success = true;
       if (sizeof($rq) > 1) {
          for ($i = 0; $i < sizeof($rq) ; $i++) {
               $res = $this->List->deleteContact($rq[$i]["id"]);
               $this->view->success &= ($res["code"] == 200) ;
               // $this->view->success = $rq[$i]['id']." ..... ".$this->view->success;
            }
       }else{
              $res = $this->List->deleteContact($rq["id"]);
               $this->view->success &= ($res["code"] == 200) ;
       }
        
    }

    public function getAction()
    {
        $limit = $this->getRequest()->getParam('limit');
        $start = $this->getRequest()->getParam('start');
        $type = $this->getRequest()->getParam('type');
        $contacts = $this->List->fetchAll($limit,$start,$type);
        // Zend_Debug::dump($this->view->contactlist, $label = null, $echo = true);
        if (!isset( $contacts['data'])) {
            $this->view->success = false;
            $this->view->results = 0;
        }else {
            $this->view->success = true;
            $this->view->contactlist = $contacts['data'];
            $this->view->results = $contacts['metadata']['total'];
        }
    }

    public function getSellerAction()
    {
        $a = $this->List->fetchAllSellers($limit,$start,$type);
        // Zend_Debug::dump($this->view->contactlist, $label = null, $echo = true);
            $this->view->success = true;
            $this->view->sellerList = $a;
    }

    public function getTermAction()
    {
        $a = $this->List->fetchAllTerm($limit,$start,$type);
        // Zend_Debug::dump($this->view->contactlist, $label = null, $echo = true);
   
            $this->view->success = true;
            $this->view->termList = json_decode($a,true);
            
    }

    public function getPriceListAction()
    {
        $a = $this->List->fetchAllPriceList($limit,$start,$type);
        // Zend_Debug::dump($this->view->contactlist, $label = null, $echo = true);
            $this->view->success = true;
            $this->view->priceList = $a;
    }
}







