Components.utils.import("resource://redthunderminebird/common.js");

load("resource://redthunderminebird/preference.js", this);
load("resource://redthunderminebird/redmine.js", this);
load("resource://redthunderminebird/utility.js", this);

//ショートカット
function byid(id) {
	return document.getElementById(id);
};

function onLoad() {
	//アカウント一覧
	var account_manager = Cc["@mozilla.org/messenger/account-manager;1"].getService(Ci.nsIMsgAccountManager);
	var accounts = account_manager.accounts;
	for (var i = 0; i < accounts.length; i++)
	{
		var account = accounts.queryElementAt(i, Ci.nsIMsgAccount);
		var value = account.incomingServer.rootFolder.URI;
		var name = account.incomingServer.prettyName;
		utility.appendMenuitem(document.querySelector('#redthunderminebird-account menupopup'), value, name);
	}

	//読み込み
	byid('redthunderminebird-redmine').value = preference.getString('redmine');
	byid('redthunderminebird-apikey').value = preference.getString('apikey');
	byid('redthunderminebird-account').value = preference.getString('account');
	byid('redthunderminebird-target_project').value = preference.getString('target_project');
	byid('redthunderminebird-filter_project').value = preference.getString('filter_project');
	byid('redthunderminebird-target_status').value = preference.getString('target_status');
	byid('redthunderminebird-filter_directory').value = preference.getString('filter_directory');
	byid('redthunderminebird-custom_fields').value = preference.getString('custom_fields');

};

function onCommit() {
	//アカウント確認
	var account = byid('redthunderminebird-account').value;
	if (!account)
	{
		alert(bundle.getLocalString("message.notselectaccount"));
		return;
	}
	//疎通確認
	var hostname = byid('redthunderminebird-redmine').value;
	var apikey = byid('redthunderminebird-apikey').value;
	var result = redmine.ping(hostname, apikey);
	if (!result)
	{
		alert(bundle.getLocalString("message.notaccessredmine"));
		return;
	}

	//保存
	preference.setString('redmine', hostname);
	preference.setString('apikey', apikey);
	preference.setString('account', account);
	preference.setString('target_project', byid('redthunderminebird-target_project').value);
	preference.setString('filter_project', byid('redthunderminebird-filter_project').value);
	preference.setString('target_status', byid('redthunderminebird-target_status').value);
	preference.setString('filter_directory', byid('redthunderminebird-filter_directory').value);
	preference.setString('custom_fields', byid('redthunderminebird-custom_fields').value);

	//コールバックして終了
	window.arguments[0](hostname, apikey);
	close();
}

function onCancel() {
	close();
}
