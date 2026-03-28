from support import load_integration_modules


def test_designer_base_view_requires_auth():
    modules = load_integration_modules()
    base = modules["base"]

    assert base.DesignerBaseView.requires_auth is True
    assert base.DesignerBaseView.cors_allowed is True
