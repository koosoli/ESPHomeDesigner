from support import load_integration_modules


def test_designer_base_view_requires_auth():
    modules = load_integration_modules()
    base = modules["base"]

    assert base.DesignerBaseView.requires_auth is True
    assert base.DesignerBaseView.cors_allowed is True


def test_pna_header_only_for_cross_origin_browser_requests():
    modules = load_integration_modules()
    base = modules["base"]

    class FakeRequest:
        def __init__(self, headers):
            self.headers = headers

    class FakeResponse:
        def __init__(self):
            self.headers = {}

    view = base.DesignerBaseView()

    browser_response = view._add_pna_headers(
        FakeResponse(), FakeRequest({"Origin": "https://example.com"})
    )
    assert browser_response.headers["Access-Control-Allow-Private-Network"] == "true"

    plain_response = view._add_pna_headers(FakeResponse(), FakeRequest({}))
    assert "Access-Control-Allow-Private-Network" not in plain_response.headers
